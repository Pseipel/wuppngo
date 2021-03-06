/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { ConfigurationEntity } from '../models/configuration-entity';
import { ResourceConfigurationEntity } from '../models/resource-configuration-entity';

/**
 * Configuration Controller
 */
@Injectable({
  providedIn: 'root',
})
class ConfigurationControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `ConfigurationControllerService.ConfigurationControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  configurationControllerReadAllResponse(params: ConfigurationControllerService.ConfigurationControllerReadAllParams): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sort != null) __params = __params.set('sort', params.sort.toString());
    if (params.dir != null) __params = __params.set('dir', params.dir.toString());
    if (params.embeddings != null) __params = __params.set('embeddings', params.embeddings.toString());
    if (params.page != null) __params = __params.set('page', params.page.toString());
    if (params.size != null) __params = __params.set('size', params.size.toString());
    if (params.filter != null) __params = __params.set('filter', params.filter.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/configurations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param params The `ConfigurationControllerService.ConfigurationControllerReadAllParams` containing the following parameters:
   *
   * - `sort`:
   *
   * - `dir`:
   *
   * - `embeddings`:
   *
   * - `page`:
   *
   * - `size`:
   *
   * - `filter`:
   *
   * @return OK
   */
  configurationControllerReadAll(params: ConfigurationControllerService.ConfigurationControllerReadAllParams): Observable<{}> {
    return this.configurationControllerReadAllResponse(params).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param newConfiguration newConfiguration
   * @return OK
   */
  configurationControllerCreateResponse(newConfiguration: ConfigurationEntity): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newConfiguration;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/configurations`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newConfiguration newConfiguration
   * @return OK
   */
  configurationControllerCreate(newConfiguration: ConfigurationEntity): Observable<{}> {
    return this.configurationControllerCreateResponse(newConfiguration).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerReadOneResponse(configurationId: string): Observable<StrictHttpResponse<ResourceConfigurationEntity>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/configurations/${configurationId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<ResourceConfigurationEntity>;
      })
    );
  }
  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerReadOne(configurationId: string): Observable<ResourceConfigurationEntity> {
    return this.configurationControllerReadOneResponse(configurationId).pipe(
      __map(_r => _r.body as ResourceConfigurationEntity)
    );
  }

  /**
   * @param newConfiguration newConfiguration
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerUpdateResponse(newConfiguration: ConfigurationEntity,
    configurationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = newConfiguration;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/configurations/${configurationId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param newConfiguration newConfiguration
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerUpdate(newConfiguration: ConfigurationEntity,
    configurationId: string): Observable<{}> {
    return this.configurationControllerUpdateResponse(newConfiguration, configurationId).pipe(
      __map(_r => _r.body as {})
    );
  }

  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerDeleteResponse(configurationId: string): Observable<StrictHttpResponse<{}>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/configurations/${configurationId}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as StrictHttpResponse<{}>;
      })
    );
  }
  /**
   * @param configurationId configurationId
   * @return OK
   */
  configurationControllerDelete(configurationId: string): Observable<{}> {
    return this.configurationControllerDeleteResponse(configurationId).pipe(
      __map(_r => _r.body as {})
    );
  }
}

module ConfigurationControllerService {

  /**
   * Parameters for configurationControllerReadAll
   */
  export interface ConfigurationControllerReadAllParams {
    sort?: string;
    dir?: string;
    embeddings?: string;
    page?: number;
    size?: number;
    filter?: string;
  }
}

export { ConfigurationControllerService }
