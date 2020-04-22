import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatSelectionList, MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  titre: number;
  partenaire: number;
  selected = [];
  @ViewChild(MatSelectionList) titleSheet: MatSelectionList;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
              ) {}

  ngOnInit() {

    this.selected = this.data.selected;
    this.partenaire = this.data.partenaire;

    this.titleSheet.selectionChange.subscribe((s: MatSelectionListChange) => {

      this.titleSheet.deselectAll();
      s.option.selected = true;
      this.titre = s.option.value;
      this.selected[this.partenaire] = {partenaire: this.partenaire, titre: this.titre};
      this.bottomSheetRef.dismiss(this.selected);
    });

    this.bottomSheetRef.backdropClick().subscribe( () => this.bottomSheetRef.dismiss(this.selected));

    this.bottomSheetRef.keydownEvents().subscribe( event => {
      if (event.key === 'Escape' && event.keyCode === 27) {
        this.bottomSheetRef.dismiss(this.selected);
      }
    });
  }

}
