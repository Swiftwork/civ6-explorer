import * as fs from 'fs';

export class XmlReader {

  public read() {
    console.log('starting reader');
    let xml2js = require('xml2js');

    let parser = new xml2js.Parser();
    // fs.readFile('../../assets/Technologies.xml', function(err, data) {
    //   parser.parseString(data, function(err, result) {
    //     console.dir(result);
    //     console.log('Done');
    //   });
    // });
  }

}
