import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Civics } from '../data/civics';
import { Era, TreeNode } from '../models/tree-node.model';
import { CivicParser } from '../services/civicparser';
import { TechnologiesParser } from '../services/technologiesparser';

@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {

  @ViewChild('treeRef') treeRef: ElementRef;

  public nodes: TreeNode[] = Civics;
  public civics: TreeNode[] = [];
  public technologies: TreeNode[] = [];

  private treeRows = 8;
  private treeHeight = 0;
  private rowHeight = 0;

  constructor(
    private civicparser: CivicParser,
    private technologiesparser: TechnologiesParser) { }

  ngOnInit() {
    this.civics = this.civicparser.Civics;
    this.technologies = this.technologiesparser.Technologies;
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
