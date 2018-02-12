import { Component, OnInit } from '@angular/core';

import { Civics } from '../data/civics';
import { TreeNode } from '../models/node.model';

@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  public nodes: TreeNode[] = Civics;

  constructor() { }

  ngOnInit() {
  }

  public transform(x = 0, y = 0, z = 0, deg = 0) {
    return `translate(${x}, ${y})` + (deg > 0 ? `rotate()` : '');
  }

}
