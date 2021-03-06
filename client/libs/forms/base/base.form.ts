import { HostBinding, Input, OnDestroy, OnInit, Type } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccessTokenModel, CrudModel, TokenProvider } from '@portal/core';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { BaseFieldComponent } from './base.field';
import { BaseStepper } from './base.stepper';

export interface FormField {
  name: string;
  input: Type<BaseFieldComponent>;
  label?: string;
  locked?: boolean;
  model?: Type<CrudModel>;
  multi?: boolean;
  options?: CrudModel[];
  tests?: ValidatorFn[];
  type?: string;
  value?: any;
}

export abstract class BaseForm<Model extends CrudModel>
  implements OnInit, OnDestroy {

  @HostBinding('class')
  public class: string = 'base-form';

  @Input()
  public group: FormGroup;

  @Input()
  public item: Model;

  @Input()
  public token: AccessTokenModel;

  public abstract fields: FormField[];

  public abstract model: Type<Model>;

  protected static template(template: string): string {
    return `
      <form [formGroup]="group">
        ${template}
        <ng-container *ngFor="let field of fields">
          <section>
            <label class="mat-body-strong" [for]="field.name">
              <ng-container *ngTemplateOutlet="label; context: { case: field }">
              </ng-container>
              <ng-container *ngIf="required(field)">*</ng-container>
            </label>
            <output [for]="field.name">
              <base-field [field]="field" [group]="group"></base-field>
            </output>
          </section>
        </ng-container>
      </form>
    `;
  }

  public get dirty(): boolean {
    return this.group.dirty;
  }

  public get valid(): boolean {
    return this.group.valid;
  }

  public constructor(
    protected route: ActivatedRoute,
    protected tokenProvider: TokenProvider
  ) { }

  public ngOnInit(): void {
    this.route.routeConfig.data.form = this;

    this.group = this.group
      || this.route.snapshot.data.group
      || new FormGroup({ });

    this.item = this.item
      || this.route.snapshot.data.item
      || new this.model();

    this.token = this.token
      || this.route.snapshot.data.tokens.access
      || new AccessTokenModel();

    this.fields = this.fields.map((field) => Object.assign(field, {
      options: field.options || this.route.snapshot.data[field.name],
      value: field.value || this.item[field.name]
    }));

    this.ngPostInit();

    this.fields.forEach((field) => {
      this.group.addControl(field.name, new FormControl({
        disabled: field.locked,
        value: field.value
      }, field.tests));
    });
  }

  public ngOnDestroy(): void {
    if (!BaseStepper.isPrototypeOf(this.route.parent.routeConfig.component)) {
      delete this.route.routeConfig.data.form;
    }
  }

  public persist(): Observable<any> {
    const item = Object.assign(new this.model(), this.item);
    this.fields.forEach((field) => Object.assign(item, {
      [field.name]: this.group.get(field.name).value
    }));

    if (this.group.dirty && this.model['provider']) {
      return (item.id
        ? this.model['provider'].update(item, item.id)
        : this.model['provider'].create(item)
      ).pipe(
        mergeMap((persisted: Model) => this.cascade(persisted)),
        tap(() => this.group.markAsPristine())
      );
    }

    return of(item);
  }

  public required(field: FormField): boolean {
    return field.tests && field.tests.includes(Validators.required);
  }

  public reset(): void {
    this.group.reset(this.item);
  }

  protected ngPostInit(): void { }

  protected cascade(item: Model): Observable<any> {
    return of(item);
  }

  protected updated(field: string):
    { add: (CrudModel & any)[], del: (CrudModel & any)[] } {

    const del = (this.item[field] || []);
    const mod = (this.group.get(field).value || []).filter((item) => item.id);
    const put = (this.group.get(field).value || []).filter((item) => !item.id);

    return {
      add: mod.filter((m) => !del.some((d) => d.id === m.id)).concat(put),
      del: del.filter((t) => !mod.some((m) => m.id === t.id))
    };
  }

}
