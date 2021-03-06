import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'imprint-dialog',
    templateUrl: 'imprint.dialog.component.html',
  })

  export class ImprintDialogComponent {

    constructor(
      public dialogRef: MatDialogRef<ImprintDialogComponent>) {
    }

    close(): void {
      this.dialogRef.close();
    }

}
