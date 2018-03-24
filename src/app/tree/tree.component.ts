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

  static CIVIC_ROWS = 7;
  static TECH_ROWS = 8;

  @ViewChild('treeRef') treeRef: ElementRef;

  public nodes: TreeNode[] = Civics;
  public civics: TreeNode[] = [];
  public technologies: TreeNode[] = [];

  protected eras = {};

  protected treeRows = 8;
  protected treeHeight = 0;
  protected rowHeight = 0;
  protected nodeWidth = 256;

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
  }

  public layout(row: number, column: number, era: Era) {
    let x = this.nodeWidth * column;
    let y = this.rowHeight * row;
    return `translate(${x}, ${y})`;
  }

  public generateCivicColumns(nodes: TreeNode[]) {
    // Split eras into separate objects
    let eraGrids: any = {};
    Object.keys(Era).filter(key => isNaN(parseInt(key, 10))).forEach(key => (eraGrids[key] = {
      rows: new Array(TreeComponent.CIVIC_ROWS).fill(undefined).map(() => []),
      sorted: { columns: [] },
    }));

    // Assign node to correct era
    nodes.forEach(node => eraGrids[Era[node.era]].sorted.columns.push(node));

    // Sort nodes based on pre-requisites
    for (const era in eraGrids) {
      const grid = eraGrids[era];
      this.eras[era] = {};

      // Too few to sort
      if (grid.sorted.columns.length <= 1) continue;
      // Sort by checking if next node requires current node then retain order else move current back
      grid.sorted.columns.sort((a: TreeNode, b: TreeNode) => b.prereq.includes(a.type) ? 0 : 1);

      const maxColumns = grid.sorted.columns.length;
      while (grid.sorted.columns.length > 0) {
        const node = grid.sorted.columns.shift();
        let pos = 0;

        if (node.prereq && node.prereq.length) {
          node.prereq.forEach((requisite: string) => {
            let isMatch = false;
            for (let x = pos; x < maxColumns; x++) {
              for (let y = 0; y < TreeComponent.CIVIC_ROWS; y++) {
                const potential = grid.rows[y][x];
                if (!potential) continue;
                if (potential !== requisite) continue;
                pos = x + 1;
                isMatch = true;
                break;
              }
              if (isMatch) {
                while (grid.rows[node.row][pos]) pos++;
                break;
              }
            }
          });
        }

        grid.rows[node.row][pos] = node.type;
        node.column = pos;
        if (this.eras[era].columnCount < pos)
          this.eras[era].columnCount = pos;
      }
    }
  }

}
