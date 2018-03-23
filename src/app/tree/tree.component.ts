import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Civics } from '../data/civics';
import { Era, TreeNode } from '../models/tree-node.model';
import { XmlReader } from '../services/xmlreader';

@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {

  @ViewChild('treeRef') treeRef: ElementRef;

  public nodes: TreeNode[] = Civics;

  private treeRows = 8;
  private treeHeight = 0;
  private rowHeight = 0;

  constructor(private xmlReader: XmlReader) { }

  ngOnInit() {
    let civicsJson;
    this.xmlReader.read('/assets/data/BaseGame/Civics.xml').subscribe((data) => {
      civicsJson = data;
    });
    console.log('civics', civicsJson);
  }

  ngAfterViewInit() {
    this.treeHeight = this.treeRef.nativeElement.clientHeight;
    this.rowHeight = this.treeHeight / this.treeRows;
    console.log(this.treeHeight);
  }

  public layout(row: number, cost: number, era: Era) {
    let x = 0;
    let y = this.rowHeight * row;
    return `translate(${x}, ${y})`;
  }

}
