
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlReader {

  constructor(private http: HttpClient) {

  }

  public read() {
    console.log('starting reader');
    this.getData().pipe(map((res: string) => this.convertToJson(res))).subscribe((res: Object) => {
      console.dir(res);
    });
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

  private getData() {
    return this.http.get('/assets/data/BaseGame/Agendas.xml', { responseType: 'text' });
  }

}
