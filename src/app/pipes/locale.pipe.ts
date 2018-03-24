import { Pipe, PipeTransform } from '@angular/core';
import { LocaleParser } from '../services/locale-parser';

@Pipe({
  name: 'locale',
})
export class LocalePipe implements PipeTransform {
  constructor(
    private localeParser: LocaleParser,
  ) { }

  transform(value: any): any {
    return null;
  }
}
