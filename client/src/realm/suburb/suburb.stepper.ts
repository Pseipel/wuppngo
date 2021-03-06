import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { SuburbFormComponent } from './suburb.form';
import { SuburbModel } from './suburb.model';

@Component({
  selector: 'suburb-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createSuburb">createSuburb</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editSuburb">editSuburb</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'suburb'">
          <i18n i18n="@@suburb">suburb</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class SuburbStepperComponent
  extends BaseStepper<SuburbModel> {

  public root: string = 'suburb';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: SuburbFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(SuburbModel);

  protected model: Type<SuburbModel> = SuburbModel;

}
