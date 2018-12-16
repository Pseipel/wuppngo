import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityListComponent } from './activity/activity.list.component';
import { ActivityViewComponent } from './activity/activity.view.component';
import { LayoutComponent } from '../layout/layout.component';
import { OrganisationListComponent } from './organisation/organisation.list.component';
import { OrganisationViewComponent } from './organisation/organisation.view.component';
import { BlogListComponent } from './blog/blog.list.component';
import { SearchResultListComponent } from './search/searchresult.list.component';
import { BlogViewComponent } from './blog/blog.view.component';
import { ActivityModel } from 'src/realm/activity/activity.model';
import { CategoryModel } from 'src/realm/category/category.model';
import { OrganisationModel } from 'src/realm/organisation/organisation.model';
import { TargetGroupModel } from 'src/realm/target-group/target-group.model';
import { SuburbModel } from 'src/realm/suburb/suburb.model';
import { AboutComponent } from './about/about.component';
import { MappingComponent } from './mapping/mapping.component';
import { CrudResolver, CrudJoiner } from '@portal/core';
import { BlogModel } from 'src/realm/blog/blog.model';

const PublicProviders = [
];

const PublicResolvers = {
};

const PublicRoutes = [
  {
    path: 'home',
    component: AboutComponent,
    resolve: {
      activities: CrudResolver
    },
    data: {
      activities: CrudJoiner.of(ActivityModel, {
        size: 15,
        dir: 'asc',
        page: 0,
        sort: 'schedules.startDate'})
        .with('category')
        .with('address').yield('suburb')
        .with('schedules')
    }
  },
  {
    path: 'list/activities',
    children: [
      {
        path: '',
        component: ActivityListComponent,
        resolve: {
          targetGroups: CrudResolver,
          categories: CrudResolver,
          suburbs: CrudResolver
        },
        data: {
          targetGroups: CrudJoiner.of(TargetGroupModel),
          categories: CrudJoiner.of(CategoryModel),
          suburbs: CrudJoiner.of(SuburbModel)
        }
      }
    ]
  },
  {
    path: 'list/activities/map',
    component: MappingComponent,
    resolve: {
      activities: CrudResolver,
    },
    data: {
      activities: CrudJoiner.of(ActivityModel)
        .with('category')
        .with('address').yield('suburb')
        .with('schedules'),
    }
  },
  {
    path: 'view/activities/:uuid',
    component: ActivityViewComponent,
    resolve: {
      activity: CrudResolver
    },
    data: {
      activity: CrudJoiner.of(ActivityModel)
        .with('category')
        .with('organisation')
        .with('targetGroups')
        .with('schedules')
        .with('address').yield('suburb')
    }
  },
  {
  path: 'list/organisations',
  children: [
      {
        path: '',
        component: OrganisationListComponent,
        resolve: {
          organisations: CrudResolver
        },
        data: {
          organisations: CrudJoiner.of(OrganisationModel)
            .with('address').yield('suburb')
            .with('images')
        }
      }
    ]
  },
  {
    path: 'view/organisations/:uuid',
    component: OrganisationViewComponent,
    resolve: {
      organisation: CrudResolver
    },
    data: {
      organisation: CrudJoiner.of(OrganisationModel)
        .with('address').yield('suburb')
        .with('activities')
        .with('images')
    }
  },
  {
    path: 'list/blogs',
    children: [
      {
        path: '/',
        component: BlogListComponent,
      },
      {
        path: '',
        component: BlogListComponent,
      }
    ]
  },
  {
    path: 'view/blogs/:uuid',
    component: BlogViewComponent,
    resolve: {
      blog: CrudResolver
    },
    data: {
      blog: CrudJoiner.of(BlogModel)
    }
  },
  {
    path: 'search',
    children: [
      {
        path: ':query',
        component: SearchResultListComponent,
      },
      {
        path: '',
        component: SearchResultListComponent
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild([{
    path: '',
    children: PublicRoutes,
    resolve: PublicResolvers,
    component: LayoutComponent
  }])],
  providers: PublicProviders
})

export class PublicRouter { }
