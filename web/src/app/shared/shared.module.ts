import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { HistoryactionsComponent } from './historyactions/historyactions.component';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';


@NgModule({
  declarations: [
    DialogComponent,
    HistoryactionsComponent,
    BottomSheetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
    exports: [
        DialogComponent,
        BottomSheetComponent,
        HistoryactionsComponent,
        MaterialModule,
        CommonModule
    ],
  entryComponents: [
    DialogComponent,
    BottomSheetComponent
  ]
})
export class SharedModule { }
