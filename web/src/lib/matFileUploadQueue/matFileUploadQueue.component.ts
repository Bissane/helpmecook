import { Component, OnDestroy, QueryList, Input, ContentChildren, forwardRef } from '@angular/core';
import { MatFileUploadComponent } from '../matFileUpload/matFileUpload.component';
import { Subscription, Observable, merge } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { BytesPipe } from '../bytes.pipe';

/**
 * A material design file upload queue component.
 */
@Component({
    selector: 'mat-file-upload-queue',
    templateUrl: `matFileUploadQueue.component.html`,
    exportAs: 'matFileUploadQueue',
  })
  export class MatFileUploadQueueComponent implements OnDestroy {

    constructor(private BytesPipe: BytesPipe) {}

    @ContentChildren(forwardRef(() => MatFileUploadComponent)) fileUploads: QueryList<MatFileUploadComponent>;

    /** Subscription to remove changes in files. */
    private _fileRemoveSubscription: Subscription | null;

    /** Subscription to changes in the files. */
    private _changeSubscription: Subscription;

    /** Combined stream of all of the file upload remove change events. */
    get fileUploadRemoveEvents(): Observable<MatFileUploadComponent> {
        return merge(...this.fileUploads.map(fileUpload => fileUpload.removeEvent));
    }

    public files: Array<any> = [];
    public queueErrorMessage: string = '';

    /* Http request input bindings */
    @Input()
    httpUrl: string;

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

    ngAfterViewInit() {
      // When the list changes, re-subscribe
      this._changeSubscription = this.fileUploads.changes.pipe(startWith(null)).subscribe(() => {
        if (this._fileRemoveSubscription) {
          this._fileRemoveSubscription.unsubscribe();
        }
        this._listenTofileRemoved();
      });
    }

    private _listenTofileRemoved(): void {
      this._fileRemoveSubscription = this.fileUploadRemoveEvents.subscribe((event: MatFileUploadComponent) => {
        this.files.splice(event.id, 1);
      });
    }

    add(file: any) {
      this.files.push(file);
    }

    public uploadAll() {
      this.queueErrorMessage = '';
      if (this.type === 'email') {
        let totalSize = this.files.reduce((acc, curr) => acc + curr.size, 0);
        if (totalSize <= 50000) {
          // if (totalSize <= 10000000) {
          this.fileUploads.forEach((fileUpload) => { fileUpload.upload() });
        } else {
          this.queueErrorMessage = `La taille de(s) pièce(s) jointe(s) dépasse la limite autorisée (${this.BytesPipe.transform(this.uploadMaxSize)})`;
        }
      } else {
        this.fileUploads.forEach((fileUpload) => { fileUpload.upload() });
      }
    }

    public removeAll() {
      this.files.splice(0, this.files.length);
      this.queueErrorMessage = '';
    }

    ngOnDestroy() {
      if (this.files) {
        this.removeAll();
      }
    }

}
