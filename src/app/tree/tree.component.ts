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

  protected columns: Map<number, TreeNode[]> = new Map<number, TreeNode[]>();

  protected treeRows = 8;
  protected treeHeight = 0;
  protected rowHeight = 0;
  protected nodeWidth = 256;

  constructor(protected xmlReader: XmlReader) { }

  ngOnInit() {
    let civicsJson;
    this.xmlReader.read('/assets/data/BaseGame/Civics.xml').subscribe((data) => {
      civicsJson = data;
    });
    console.log('civics', civicsJson);
    this.updateColumns(this.nodes);
  }

  ngAfterViewInit() {
    this.treeHeight = this.treeRef.nativeElement.clientHeight;
    this.rowHeight = this.treeHeight / this.treeRows;
    console.log(this.treeHeight);
  }

  updateColumns(nodes: TreeNode[]) {
    nodes.forEach((node) => {
      let column = this.columns.get(node.cost) || [];
      column.push(node);
      this.columns.set(node.cost, column);
    });
    console.log(this.columns);
  }

  public layout(row: number, cost: number, era: Era) {
    let x = this.nodeWidth;
    let y = this.rowHeight * (row + 3);
    return `translate(${x}, ${y})`;
  }

}
