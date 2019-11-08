
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Era, TreeNode } from '../models/tree-node.model';
import { IBoostRow } from '../models/xml/shared';
import { XmlReader } from './xmlreader';

@Injectable()
export class LocaleParser {

  protected _locale = new Map<string, string>();

  constructor(private xmlReader: XmlReader) {
  }

  public loadLocale(locale = 'en_US', group?: string) {
    return this.xmlReader.read(`/assets/game/BaseGame/Locale/${locale}/${group}.xml`).map((data: any) => {
      for (let i = 0; i < data.GameData.BaseGameText.Row.length; i++) {
        this._locale.set(
          data.GameData.BaseGameText.Row[i].$.Tag,
          data.GameData.BaseGameText.Row[i].Text,
        );
      }
    }).toPromise();
  }

  public translate(key: string): string {
    return this._locale.get(key) || 'missing translation';
  }
}
