
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as xml2js from 'xml2js';

@Injectable()
export class XmlReader {

  constructor(private http: Http) {

  }

  public read() {
    console.log('starting reader');

    let parser = new xml2js.Parser();
    this.http.get('/assets/BaseGame/Agendas.xml').subscribe((data) => {

      console.log('data', data);
      // parser.parseString(data, (result: xml2js.convertableToString) => {
      //   console.dir(result);
      //   console.log('Done');
      // });
    });
  }

}
