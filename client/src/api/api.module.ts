/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { ActivityControllerService } from './services/activity-controller.service';
import { BlogControllerService } from './services/blog-controller.service';
import { AddressControllerService } from './services/address-controller.service';
import { CategoryControllerService } from './services/category-controller.service';
import { ConfigurationControllerService } from './services/configuration-controller.service';
import { LanguageControllerService } from './services/language-controller.service';
import { NewsControllerService } from './services/news-controller.service';
import { OrganisationControllerService } from './services/organisation-controller.service';
import { PageControllerService } from './services/page-controller.service';
import { SecurityControllerService } from './services/security-controller.service';
import { SuburbControllerService } from './services/suburb-controller.service';
import { TagControllerService } from './services/tag-controller.service';
import { TargetGroupControllerService } from './services/target-group-controller.service';
import { TopicControllerService } from './services/topic-controller.service';
import { TranslationControllerService } from './services/translation-controller.service';
import { UserControllerService } from './services/user-controller.service';

/**
 * Provider for all api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    ActivityControllerService,
    BlogControllerService,
    AddressControllerService,
    CategoryControllerService,
    ConfigurationControllerService,
    LanguageControllerService,
    NewsControllerService,
    OrganisationControllerService,
    PageControllerService,
    SecurityControllerService,
    SuburbControllerService,
    TagControllerService,
    TargetGroupControllerService,
    TopicControllerService,
    TranslationControllerService,
    UserControllerService
  ],
})
export class ApiModule { }
