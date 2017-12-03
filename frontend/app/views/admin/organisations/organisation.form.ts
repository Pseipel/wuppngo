import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';
import { NgForm, FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { DataServiceFactory, OrganisationService, AddressService, SuburbService } from 'app/services/data.service.factory';
import { DataService } from 'app/services/data.service';
import { NominatimService } from 'app/services/nominatim';
import { SuburbSelectionComponent } from 'app/views/common/popup.suburb.selection';

import { Organisation } from 'app/models/organisation';
import { Address } from 'app/models/address';

import { Constants } from 'app/views/common/constants';


@Component({
	selector: 'edit-organisation',
	templateUrl: 'organisation.form.html',
	styleUrls: ['../../../app.component.css'],
	providers: [
		{ provide: OrganisationService, useFactory: DataServiceFactory(OrganisationService), deps: [HttpClient] },
		{ provide: AddressService, useFactory: DataServiceFactory(AddressService), deps: [HttpClient] }
	]
})

export class OrganisationFormComponent implements OnInit {
	organisation: Organisation;
	addresses: Address[];
	filteredAddresses: Observable<Address[]>;
	addressCtrl: FormControl;
	nominatimAddress: Address;

	constructor(
		@Inject(OrganisationService) private service: DataService,
		@Inject(AddressService) private addressService: DataService,
		private location: Location,
		public route: ActivatedRoute,
		public constants: Constants,
		private suburbSelectDialog: MatDialog,
		private nominatimService: NominatimService,
	) {
		this.addressService.getAll().subscribe((data) => this.addresses = data.records);
	}

	ngOnInit(): void {
		this.route.paramMap
			.switchMap((params: ParamMap) =>
				this.service.get(params.get('id'))).subscribe((data) => {
					this.organisation = data.records;
					this.addressCtrl = new FormControl(data.records.address);
					this.filteredAddresses = this.addressCtrl.valueChanges
						.startWith(<any>[])
						.map(address => address && typeof address === 'object' ? this.toString(address) : address)
						.map(address => address ? this.filterAddresses(address) : this.addresses.slice());
				});
	}

	filterAddresses(name: string): Address[] {
		return this.addresses.filter(address =>
			this.toString(address).toLocaleLowerCase().indexOf(name.toLowerCase()) !== -1);
	}

	toString(address: any): string {
		if (typeof address === 'string') {
			return address;
		}
		if (typeof address === 'object') {
			return (address.street + ' ' + address.house_number + ' ' + address.postal_code + ' ' +
				address.place + ' ' + (address.suburb ? address.suburb.name : ''));
		}
	}

	compareAddresses(address1: Address, address2: Address): boolean {
		if (address1.street.toLocaleLowerCase().localeCompare(address2.street.toLocaleLowerCase()) === 0 &&
			address1.house_number.toLocaleLowerCase().localeCompare(address2.house_number.toLocaleLowerCase()) === 0 &&
			address1.postal_code.toLocaleLowerCase().localeCompare(address2.postal_code.toLocaleLowerCase()) === 0 &&
			address1.place.toLocaleLowerCase().localeCompare(address2.place.toLocaleLowerCase()) === 0
		) {
			return true;
		} else {
			return false;
		}
	}

	getNominatimData(): void {
		this.nominatimService.get(this.toString(this.addressCtrl.value)).subscribe((data) => this.nominatimAddress = data);
	}

	onSubmit(): void {
		if (typeof this.addressCtrl.value === 'string') {
			this.nominatimService.get(this.toString(this.addressCtrl.value)).subscribe((data) => {
				this.nominatimAddress = data;
				for (const currAddress of this.addresses) {
					if (this.compareAddresses(currAddress, this.nominatimAddress)) {
						this.organisation.address_id = currAddress.id;
						this.service.edit(this.organisation);
						return;
					}
				}
				this.organisation.address = null;
				this.nominatimAddress.id = null;
				this.openDialog(this.nominatimAddress);
			});
		} else {
			if (this.addressCtrl.value.id) {
				if (this.addressCtrl.value.id !== this.organisation.address_id) {
					this.organisation.address_id = this.addressCtrl.value.id;
				} else {
					console.log('Address was not changed');
				}
			}
			this.service.edit(this.organisation);
			this.back();
		}
	}

	openDialog(newAddress: Address): void {
		const dialogRef = this.suburbSelectDialog.open(SuburbSelectionComponent, {
			width: '250px',
			data: {
				name: '',
				message: 'Sie haben eien neue Adresse eingegeben. Bitte geben Sie den entsprechenden Stadtteil ein.'
					+ this.toString(newAddress),
				address: newAddress
			}
		});

		dialogRef.afterClosed().subscribe(() => {
			this.addressService.add(this.nominatimAddress).subscribe((response) => {
				this.organisation.address_id = response.records.id;
				this.service.edit(this.organisation);
			});
			this.back();
		});
	}

	back(): void {
		this.location.back();
	}

}