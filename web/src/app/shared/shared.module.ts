import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';


@NgModule({
  declarations: [
    DialogComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
    exports: [
        DialogComponent,
        BottomSheetComponent,
        MaterialModule,
        CommonModule
    ],
  entryComponents: [
    DialogComponent,
    BottomSheetComponent
  ]
})
export class SharedModule { }
