
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlReader {

  constructor(private http: HttpClient) {

  }

  public read(xmlPath: string): Observable<Object> {
    return this.getData(xmlPath).pipe(map((res: string) => this.convertToJson(res)));
  }

  private convertToJson(data: string): Object {
    let res;

    xml2js.parseString(data, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        res = result;
      }
    });

    return res;
  }

  private getData(path: string) {
    return this.http.get(path, { responseType: 'text' });
  }

}
