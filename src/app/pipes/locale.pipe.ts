import { Pipe, PipeTransform } from '@angular/core';
import { LocaleParser } from '../services/locale-parser';

@Pipe({
  name: 'locale',
})
export class LocalePipe implements PipeTransform {
  constructor(
    private localeParser: LocaleParser,
  ) { }

  transform(key: string): string {
    return this.localeParser.translate(key);
  }
}
