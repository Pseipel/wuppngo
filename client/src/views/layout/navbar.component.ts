import { Component } from '@angular/core';
import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule
} from '@angular/material';

@Component({
    selector: 'navbar-component',
    styleUrls: ['layout.component.scss'],
    templateUrl: 'navbar.component.html'
})

export class NavBarComponent {

    public static readonly imports = [
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDialogModule,
        MatExpansionModule,
        MatButtonModule
    ];

    public routeLinks: any[] = [];

    public constructor() {
        this.initGlobalTabs();
    }

  initGlobalTabs(): void {
        this.routeLinks.push(
        {
            label: 'Wupp\'n\'go',
            link: '/home',
            index: 0
        },
        {
            label: 'Veranstaltungen',
            link: '/list/activities',
            index: 1
        },
        {
            label: 'Organisationen',
            link: '/list/organisations',
            index: 2
        },
        {
            label: 'Wissenswertes',
            link: '/worthknowing',
            index: 3
        },
        {
            label: 'Blog',
            link: '/list/blogs',
            index: 4
        });
  }

//   Just Prototyping
  getAccountRoutes(): any {
        return [{
            label: 'Persönlicher Daten',
            link: 'admin/',
            index: 0
        },
        {
            label: 'verwaltungsbereich',
            link: 'admin/',
            index: 1
        },
        {
            label: 'Abmelden',
            link: 'admin/',
            index: 2
        }];
    }


}