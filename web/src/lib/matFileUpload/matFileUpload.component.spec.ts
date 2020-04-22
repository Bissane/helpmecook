import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatFileUploadComponent } from './matFileUpload.component';
import { MatProgressBarModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { BytesPipe } from '../bytes.pipe';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MatFileUploadQueueComponent } from '../matFileUploadQueue/matFileUploadQueue.component';

describe('MatFileUploadComponent', () => {


 beforeEach(() => {
   TestBed.configureTestingModule({
    imports: [
      MatButtonModule,
      MatProgressBarModule,
      MatIconModule,
      MatCardModule,
      HttpClientTestingModule
    ],
    declarations: [MatFileUploadComponent, MatFileUploadQueueComponent, BytesPipe],
    providers: [ {provide: HttpClient, useValue: HttpTestingController } ]
    });


 });

 it ('should work', () => {
   let fixture = TestBed.createComponent(MatFileUploadComponent);
   expect(fixture.componentInstance instanceof MatFileUploadComponent).toBe(true, 'should create MatFileUploadComponent');
 });
});
