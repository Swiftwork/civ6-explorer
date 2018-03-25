import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LocalePipe } from '../pipes/locale.pipe';
import { CivicParser } from '../services/civicparser';
import { LocaleParser } from '../services/locale-parser';
import { TechnologiesParser } from '../services/technologiesparser';
import { XmlReader } from '../services/xmlreader';
import { TreeComponent } from './tree.component';

const DECLARATION: any[] = [
  TreeComponent,
  LocalePipe,
];

const PROVIDERS: any[] = [
  XmlReader,
  CivicParser,
  TechnologiesParser,
  LocaleParser,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: DECLARATION,
  exports: DECLARATION,
  providers: PROVIDERS,
})
export class TreeModule { }
