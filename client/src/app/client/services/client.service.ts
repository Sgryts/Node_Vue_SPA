import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientService } from './IClientService';

@Injectable()
export class ClientService {
  constructor(private _service: IClientService) {

  }

  public httpCall<T>(params: string): Observable<T> {
    return this._service.httpCall(params);
  }
}
