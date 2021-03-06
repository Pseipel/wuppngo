import { AfterViewInit, Component, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'info-bottom-sheet',
  template: `
  <div [style.height]="'10vh'" [style.text-align]="'center'">
    <i18n i18n="'@@' + message">{{message}}</i18n>
  </div>`
})

export class InfoBottomComponent implements AfterViewInit {

    public message: string;

    constructor(
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
        private bottomSheetRef: MatBottomSheetRef<InfoBottomComponent>) {
        this.message = data.message;
    }

    ngAfterViewInit() {
      setTimeout(() => this.bottomSheetRef.dismiss(), 3000);
    }


}
