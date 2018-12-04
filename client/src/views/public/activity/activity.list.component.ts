import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivityProvider } from 'src/realm/activity/activity.provider';
import { AddressModel } from 'src/realm/address/address.model';
import { CategoryProvider } from 'src/realm/category/category.provider';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { ScheduleModel } from 'src/realm/schedule/schedule.model';
import { SuburbProvider } from 'src/realm/suburb/suburb.provider';
import { TargetGroupProvider } from 'src/realm/target-group/target-group.provider';
import { ActivityModel } from '../../../realm/activity/activity.model';
import { CategoryModel } from '../../../realm/category/category.model';
import { SuburbModel } from '../../../realm/suburb/suburb.model';
import { TargetGroupModel } from '../../../realm/target-group/target-group.model';
import { BottomSheetMapComponent } from '../mapping/map.bottomsheet.component';
import { MappingComponent } from '../mapping/mapping.component';


@Component({
  styleUrls: ['activity.list.component.css'],
  templateUrl: 'activity.list.component.html'
})

export class ActivityListComponent {

  public static readonly imports = [];
  public activities: ActivityModel[] = [];

  public suburbs: Promise<SuburbModel[]>;
  public categories: Promise<CategoryModel[]>;
  public target_groups: Promise<TargetGroupModel[]>;

  @ViewChild(MappingComponent)
  private mapping: MappingComponent;

  constructor(
    private bottomSheet: MatBottomSheet,
    private activityProvider: ActivityProvider,
    private categoryProvider: CategoryProvider,
    private targetGroupsProvider: TargetGroupProvider,
    private suburbProvider: SuburbProvider
  ) {
    this.suburbs = suburbProvider.findAll({});
    this.target_groups = targetGroupsProvider.findAll({});
    this.categories = categoryProvider.findAll({});

    let i = 0;
      for (i; i < 20; i++) {
        this.activities.push(this.buildTestActivity());
      }
  }

  openBottomSheetMap(): void {
    this.bottomSheet.open(BottomSheetMapComponent,
      { data: { activities: this.activities } });
  }

    buildTestActivity(): ActivityModel {
      const actOne = new ActivityModel;
      // actOne.id = 'testActivity';
      actOne.name = 'FakeActivity';
      actOne.description = 'This is just a FakeActivity to show'
        + 'how this could look like.';
      const testAddress = new AddressModel();
      testAddress.street = 'samplestreet';
      testAddress.houseNumber = '42a';
      testAddress.latitude = 51.00;
      testAddress.longitude = 7.00;
      testAddress.postalCode = '63628';

      const testSubUrb = new SuburbModel();
      testSubUrb.name = 'Elberfeld';
      // testSubUrb.id = '1';

      testAddress.suburb = new Promise<SuburbModel>((resolve, reject) => {
        resolve(testSubUrb);
      });

      testAddress.place = 'SampleCity';
      actOne.address = new Promise<AddressModel>((resolve, reject) => {
        resolve(testAddress);
      });

      const category = new CategoryModel;
      category.name = 'party';
      category.color = 'blue';

      actOne.category = new Promise<CategoryModel>((resolve, reject) => {
        resolve(category);
      });

      const target_group = new TargetGroupModel;
      target_group.name = 'youth';
      const targetGroups = [target_group];

      actOne.targetGroups =
        new Promise<TargetGroupModel[]>((resolve, reject) => {
        resolve(targetGroups);
      });

      const schedule = new ScheduleModel;
      schedule.startDate = new Date().toUTCString();
      schedule.endDate = new Date().toUTCString();
      const schedules = [schedule];

      const firstDate = new ScheduleModel;
      firstDate.startDate = new Date().toISOString();
      firstDate.endDate =
        new Date(new Date(firstDate.startDate).getDate() + 1).toISOString();

        const secondDate = new ScheduleModel;
      secondDate.startDate = new Date(new Date().getDate() + 7).toISOString();
      secondDate.endDate =
        new Date(new Date(secondDate.startDate).getDate() + 1).toISOString();

        schedules.push(firstDate);
      schedules.push(secondDate);

      actOne.schedules = new Promise<ScheduleModel[]>((resolve, reject) => {
        resolve(schedules);
      });

      const organisation = new OrganisationModel;
      organisation.name = 'testOrganisation';
      actOne.organisation =
        new Promise<OrganisationModel>((resolve, reject) => {
        resolve(organisation);
      });

      return actOne;
  }

}
