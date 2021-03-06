import { Component, Type } from '@angular/core';
import { CrudJoiner } from '@portal/core';
import { BaseStepper, FormStep } from '@portal/forms';
import { UserFormComponent } from './user.form';
import { UserModel } from './user.model';

@Component({
  selector: 'user-stepper',
  template: BaseStepper.template(`
    <ng-template #label let-case="case">
      <ng-container [ngSwitch]="case.name">
        <ng-container *ngSwitchCase="'create'">
          <i18n i18n="@@createUser">createUser</i18n>
        </ng-container>
        <ng-container *ngSwitchCase="'edit'">
          <i18n i18n="@@editUser">editUser</i18n>
        </ng-container>

        <ng-container *ngSwitchCase="'user'">
          <i18n i18n="@@user">user</i18n>
        </ng-container>
      </ng-container>
    </ng-template>
  `)
})

export class UserStepperComponent
  extends BaseStepper<UserModel> {

  public root: string = 'user';

  public steps: FormStep[] = [
    {
      name: this.root,
      form: UserFormComponent
    }
  ];

  protected joiner: CrudJoiner = CrudJoiner.of(UserModel);

  protected model: Type<UserModel> = UserModel;

}
