import { Component, OnInit } from '@angular/core';

import { Civics } from '../data/civics';
import { Era, TreeNode } from '../models/tree-node.model';
import { XmlReader } from '../services/xmlreader';

@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {

  public nodes: TreeNode[] = Civics;

  private rows = 9;

  constructor(private xmlReader: XmlReader) { }

  ngOnInit() {
    this.xmlReader.read();
  }

  public layout(row: number, cost: number, era: Era) {
  }

}
