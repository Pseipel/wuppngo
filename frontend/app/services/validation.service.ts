import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class ValidationService implements ErrorStateMatcher {

	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}

	passwordMatch(g: FormGroup): any {
		return g.get('newPasswordCtrl').value === g.get('repeatPasswordCtrl').value
			? null : { 'notEquivalent': true };
	}
}
