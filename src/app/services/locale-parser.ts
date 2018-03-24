
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Era, TreeNode } from '../models/tree-node.model';
import { IBoostRow } from '../models/xml/shared';
import { XmlReader } from './xmlreader';

@Injectable()
export class LocaleParser {

  protected _locale = new BehaviorSubject<Map<string, string>>(new Map());
  public locale = this._locale.asObservable();

  constructor(private xmlReader: XmlReader) {
    this.loadLocale('en_US', 'Civics_Text');
  }

  public loadLocale(locale = 'en_US', group?: string) {
    this.xmlReader.read(`/assets/data/BaseGame/Locale/${locale}/${group}.xml`).subscribe((data: any) => {
      const locale = new Map();
      for (let i = 0; i < data.GameData.BaseGameText.Row.length; i++) {
        locale.set(
          data.GameData.BaseGameText.Row[i].$.Tag,
          data.GameData.BaseGameText.Row[i].Text,
        );
      }
      this._locale.next(locale);
    });
  }
}
