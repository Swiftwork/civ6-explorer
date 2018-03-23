import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmlReader } from '../services/xmlreader';
import { TreeComponent } from './tree.component';

const DECLARATION: any[] = [
  TreeComponent,
];

const PROVIDERS: any[] = [
  XmlReader,
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
