import { Component } from '@angular/core';
import { MatSelectModule, MatBottomSheet, MatBottomSheetModule, MatCheckboxModule } from '@angular/material';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/realm/user/user.model';
import { UserProvider } from 'src/realm/user/user.provider';
import { InfoBottomComponent } from './info.bottomsheet.component';
import { Location } from '@angular/common';
import { TokenProvider } from '@portal/core';

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    static readonly imports = [
        MatSelectModule,
        MatBottomSheetModule,
        MatCheckboxModule
    ];

    userName: string = '';
    password: string = '';
    passwordRepeat: string;
    fullName: string;
    phone: string;
    isBlogger: boolean;

    error: string;
    organisationsCtrl = new FormControl();
    organisations: any[];

    constructor(
        private router: Router,
        private tokenProvider: TokenProvider,
        private _location: Location,
        private route: ActivatedRoute,
        private userProvider: UserProvider,
        private bottomSheet: MatBottomSheet
        ) {
            this.organisations = this.route.snapshot.data.organisations;
            this.organisations.unshift({
                name: 'Meine Organisation ist nicht dabei',
                id: 'orgaDoesNotExist'});
        }

    register(): void {
        const user = new UserModel;
        user.name = this.fullName;
        user.password = this.password;
        user.phone = this.phone;
        user.applyBlogger = this.isBlogger;
        user.username = this.userName;
        user.organisations = this.organisationsCtrl.value;
        this.userProvider.create(user).subscribe(() => {
            this.openBottomSheet();
            this.tokenProvider.login(this.userName, this.password).subscribe(
                () => {
                    if (this.organisationsCtrl &&
                        this.organisationsCtrl.value &&
                        this.organisationsCtrl.value.find
                        (entry => entry.id === 'orgaDoesNotExist')) {
                            this.goToCreateOrganisation();
                    } else {
                        this.goToLogin();
                    }
                }
            );
        },
        error => {
            this.error = error;
            console.log(error);
        });
    }

    goToLogin(): void {
        this.router.navigate(['/admin/login']);
    }

    goToCreateOrganisation(): void {
        this.router.navigate(['/admin/edit/organisation/new']);
    }

    goToHome(): void {
        this.router.navigate(['/home']);
    }

    openBottomSheet(): void {
        this.bottomSheet.open(InfoBottomComponent,
            { data: { message: 'successfullRegister' } });
    }

    back(): void {
        this._location.back();
    }
}
