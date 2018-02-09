import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './tree.component';

const DECLARATION: any[] = [
  TreeComponent,
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: DECLARATION,
  exports: DECLARATION,
})
export class TreeModule { }
