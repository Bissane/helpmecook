import { Component, EventEmitter, Input, OnDestroy, Output, Inject, forwardRef } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatFileUploadQueueComponent } from '../matFileUploadQueue/matFileUploadQueue.component';
import { BytesPipe } from '../bytes.pipe';

/**
 * A material design file upload component.
 */
@Component({
    selector: 'mat-file-upload',
    templateUrl: `./matFileUpload.component.html`,
    exportAs: 'matFileUpload',
    host: {
      'class': 'mat-file-upload',
    },
    styleUrls: ['./../matFileUploadQueue.scss'],
  })
  export class MatFileUploadComponent implements OnDestroy {

    constructor(
      private HttpClient: HttpClient,
      private BytesPipe: BytesPipe,
      @Inject(forwardRef(() => MatFileUploadQueueComponent)) public matFileUploadQueue: MatFileUploadQueueComponent
    ) {

        if(matFileUploadQueue) {
          this.httpUrl = matFileUploadQueue.httpUrl || this.httpUrl;
          this.httpRequestHeaders = matFileUploadQueue.httpRequestHeaders || this.httpRequestHeaders;
          this.httpRequestParams = matFileUploadQueue.httpRequestParams || this.httpRequestParams;
          this.fileAlias = matFileUploadQueue.fileAlias || this.fileAlias;
          this.region = matFileUploadQueue.region || this.region;
          this.uploadMaxSize = matFileUploadQueue.uploadMaxSize || this.uploadMaxSize;
          this.type = matFileUploadQueue.type || this.type;
          this.validMimeType = matFileUploadQueue.validMimeType || this.validMimeType;
        }

    }

    public isUploading:boolean = false;
    public errorMessage: string;



    /* Http request input bindings */
    @Input()
    httpUrl: string = 'http://localhost:8080';

    @Input()
    httpRequestHeaders: HttpHeaders | {
      [header: string]: string | string[];
    } = new HttpHeaders();

    @Input()
    httpRequestParams: HttpParams | {
      [param: string]: string | string[];
    } = new HttpParams();

    @Input()
    fileAlias: string = "file";

    @Input()
    region: string = "76";

    @Input()
    uploadMaxSize: number = 10000000; // 10M

    @Input()
    type: string = "export";

    @Input()
    validMimeType: any[];

    @Input()
    get file(): any {
      return this._file;
    }
    set file(file: any) {
      this._file = file;
      this.total = this._file.size;
    }

    @Input()
    set id(id: number) {
      this._id = id;
    }
    get id(): number {
      return this._id;
    }

    /** Output  */
    @Output() removeEvent = new EventEmitter<MatFileUploadComponent>();
    @Output() onUpload = new EventEmitter();

    public progressPercentage: number = 0;
    public loaded: number = 0;
    public total: number = 0;
    private _file: any;
    private _id: number;
    private fileUploadSubscription: any;

    public upload(): void {
      this.isUploading = true;
      // How to set the alias?
      let formData = new FormData();
      formData.set(this.fileAlias, this._file, this._file.name);
      formData.append('region', this.region);
      formData.append('type', this.type);
      // console.log(this._file);
      const isValid = this.validMimeType.map(item => item.mimeType).includes(this._file.type);
      if (isValid) {
        if (this._file.size <= this.uploadMaxSize) {
          this.fileUploadSubscription = this.HttpClient.post(this.httpUrl, formData, {
            headers: this.httpRequestHeaders,
            observe: 'events',
            params: this.httpRequestParams,
            reportProgress: true,
            responseType: 'json'
          }).subscribe((event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progressPercentage = Math.floor(event.loaded * 100 / event.total);
                  this.loaded = event.loaded;
                  this.total = event.total;
                }
                if(event.type === HttpEventType.Response) {
                  this.onUpload.emit({status: 'Response', event: event});
                }
                this.onUpload.emit({file: this._file, event: event});
              }, (error: any) => {
                if (this.fileUploadSubscription) {
                  this.fileUploadSubscription.unsubscribe();
                }
                this.isUploading = false;
                this.onUpload.emit({file: this._file, event: event});
              },
              () => {
                this.onUpload.emit({status: 'complete', event: event});
              }
          );
        } else {
          this.errorMessage = `Le fichier spécifié <strong>${this._file.name}</strong> est trop volumineux. Taille maximale (${this.BytesPipe.transform(this.uploadMaxSize)})`;
        }
      } else {
        const validExt = this.validMimeType.reduce((prev, curr) => {
          prev += curr.extention + ' ';
          return prev;
        }, '');
        this.errorMessage = `Le fichier spécifié <strong>${this._file.name}</strong> n'a pas pu être publié. Seuls les fichiers avec les extensions suivantes sont autorisés: <strong>${validExt}</strong>`;
      }
    }

    public remove(): void {
      if (this.fileUploadSubscription) {
        this.fileUploadSubscription.unsubscribe();
      }
      this.removeEvent.emit(this);
    }

    ngOnDestroy() {
      console.log('file '+ this._file.name + ' destroyed...');
    }

}
