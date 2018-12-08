import { Injectable, Injector } from '@angular/core';
import { CrudProvider } from '@portal/core';
import { SuburbControllerService } from '../../api/services/suburb-controller.service';
import { SuburbModel } from '../suburb/suburb.model';

@Injectable({ providedIn: 'root' })
export class SuburbProvider
  extends CrudProvider<SuburbControllerService, SuburbModel> {

  public create: (model: SuburbModel) => Promise<any>;

  public update: (id: string, model: SuburbModel) => Promise<any>;

  public delete: (id: string) => Promise<any>;

  public findOne: (id: string) => Promise<SuburbModel>;

  public findAll: (params?: SuburbControllerService
    .SuburbControllerReadAllParams) => Promise<SuburbModel[]>;

  protected linked = [];

  protected methods = {
    create: this.service.suburbControllerCreateResponse,
    delete: this.service.suburbControllerDeleteResponse,
    findAll: this.service.suburbControllerReadAllResponse,
    findOne: this.service.suburbControllerReadOneResponse,
    update: this.service.suburbControllerUpdateResponse
  };

  protected model = this.based(SuburbModel);

  public constructor(
    protected injector: Injector,
    protected service: SuburbControllerService
  ) {
    super();
  }

}