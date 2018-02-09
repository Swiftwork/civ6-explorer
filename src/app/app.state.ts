import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export type InternalStateType = {
  [key: string]: any,
};

/**
 * 
 * AppStateService is used to get common global settings from EPI that affects the whole site. 
 * It is dependant on the IAngularAppInitializationConfig from BackendModels.Application. 
 * To access the current AppState one should subscribe to the public appState variable.
 * Observable<any>
 * @example
 *  this.appStateService.appState.subscribe((state) => {});
 */
@Injectable()
export class AppState {

  static APP_STATE_URL = '/cmsapi/sitecommon/settings';

  public _state: InternalStateType = {};

  constructor(private http: Http) {
    this.extractData = this.extractData.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  public loadBackendAppState(): Observable<any> {
    return this.http.get(AppState.APP_STATE_URL)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: any): any {
    const settings = res.json().Model;
    for (let key in settings) this.set(key, settings[key]);
    return settings;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ?
      error.message : error.status ? `${error.status} - ${error.statusText}` : `Server error`;
    return Observable.throw(errMsg);
  }

  /**
   * Already return a clone of the current state.
   */
  public get state() {
    return this._state = this._clone(this._state);
  }
  /**
   * Never allow mutation
   */
  public set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  public get(prop?: any) {
    /**
     * Use our state getter for the clone.
     */
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : null;
  }

  public set(prop: string, value: any) {
    /**
     * Internally mutate our state.
     */
    return this._state[prop] = value;
  }

  private _clone(object: InternalStateType) {
    /**
     * Simple object clone.
     */
    return JSON.parse(JSON.stringify(object));
  }
}
