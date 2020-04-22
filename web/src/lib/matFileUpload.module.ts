import { NgModule } from '@angular/core';
import { MatFileUploadComponent } from './matFileUpload/matFileUpload.component';
import { MatFileUploadQueueComponent } from './matFileUploadQueue/matFileUploadQueue.component';
import { FileUploadInputFor } from './fileUploadInputFor.directive';

import { MatProgressBarModule, MatCardModule, MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { BytesPipe } from './bytes.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    CommonModule
  ],
  declarations: [
    MatFileUploadComponent,
    MatFileUploadQueueComponent,
    FileUploadInputFor,
    BytesPipe
  ],
  exports: [
    MatFileUploadComponent,
    MatFileUploadQueueComponent,
    FileUploadInputFor,
    BytesPipe
  ],
  providers: [BytesPipe],
})
export class MatFileUploadModule { }
