import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Civics } from '../data/civics';
import { Era, TreeNode } from '../models/tree-node.model';
import { CivicParser } from '../services/civicparser';
import { TechnologiesParser } from '../services/technologiesparser';
import { LocaleParser } from '../services/locale-parser';

@Component({
  selector: 'x-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent implements OnInit {

  static CIVIC_ROWS = 7;
  static TECH_ROWS = 8;

  @ViewChild('treeRef') treeRef: ElementRef;

  public nodes: TreeNode[] = [];
  public civics: TreeNode[] = [];
  public technologies: TreeNode[] = [];

  protected eras: string[] = [];
  protected eraGrids = {};

  public treeRows = TreeComponent.CIVIC_ROWS;
  public treeWidth = 1920;
  public treeHeight = 480;
  public eraGap = 240;
  public nodeWidth = 480;
  public nodeHeight = 96;
  public nodeHGap = 96;
  public nodeVGap = 12;
  public prereqRadius = 12;

  constructor(
    private civicParser: CivicParser,
    private technologiesParser: TechnologiesParser,
    private localeParser: LocaleParser,
  ) { }

  ngOnInit() {
    this.eras = Object.keys(Era).filter(key => isNaN(parseInt(key, 10)));
    this.civicParser.civics.subscribe(civics => {
      this.civicEraGrids(civics);
      const lastEra = this.eraGrids[this.eras[this.eras.length - 1]];
      this.treeWidth = (lastEra.priorColumns + lastEra.columnCount) *
        (this.nodeWidth + this.nodeHGap) +
        this.eraGap * this.eras.length;
      this.treeHeight = this.treeRows * (this.nodeHeight + 12);
    });
    this.localeParser.locale.subscribe((locale) => {
      console.log(locale);
    });
    //this.technologies = this.technologiesParser.Technologies;
    //this.technologies = this.technologiesParser.Technologies;
  }

  public layout(row: number, column: number, era: Era) {
    let x = this.columnToPixel(column, era + 1);
    let y = this.rowToPixel(row);
    return `translate(${x}, ${y})`;
  }

  public layoutEra(era: Era) {
    let x = this.columnToPixel(this.eraGrids[Era[era]].priorColumns, era);
    let y = 0;
    return `translate(${x}, ${y}) rotate(90, 0, ${0})`;
  }

  public layoutPrereq(node: TreeNode) {
    const prereqNodes = this.nodes.filter((stored) => node.prereq.includes(stored.type));
    const paths = prereqNodes.map(prereq => {
      const grid = this.eraGrids[Era[prereq.era]];
      const columnDelta = grid.columnCount - prereq.column - 1 + node.column;
      const prereqY = this.rowToPixel(prereq.row) - this.rowToPixel(node.row);
      const prereqX = prereq.era !== node.era ? this.columnToPixel(columnDelta, 1) : 0;
      return this.roundedCorners([
        - this.nodeHGap - prereqX,
        prereqY + this.nodeHeight / 2,
        - this.nodeHGap / 2,
        prereqY + this.nodeHeight / 2,
        - this.nodeHGap / 2,
        this.nodeHeight / 2,
        0,
        this.nodeHeight / 2,
      ]);
    });
    return paths;
  }

  public civicEraGrids(nodes: TreeNode[]) {
    // Split eras into separate objects
    this.nodes = nodes;
    this.eraGrids = {};
    this.eras.forEach(key => (this.eraGrids[key] = {
      rows: new Array(TreeComponent.CIVIC_ROWS).fill(undefined).map(() => []),
      sorted: { columns: [] },
      columnCount: 0,
      priorColumns: 0,
    }));

    // Assign node to correct era
    nodes.forEach(node => this.eraGrids[Era[node.era]].sorted.columns.push(node));

    let previousEra;
    // Sort nodes based on pre-requisites
    for (const era in this.eraGrids) {
      const grid = this.eraGrids[era];

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
                if (potential.type !== requisite) continue;
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

        grid.rows[node.row][pos] = node;
        node.column = pos;

        if (this.eraGrids[era].columnCount < pos + 1)
          this.eraGrids[era].columnCount = pos + 1;
        if (previousEra)
          this.eraGrids[era].priorColumns = this.eraGrids[previousEra].priorColumns + this.eraGrids[previousEra].columnCount;
      }
      previousEra = era;
    }
  }

  /* HELPERS */

  public roundedCorners(points: number[]) {
    const r = this.prereqRadius;
    let deltaY = points[5] - points[3];
    let sweep = deltaY > 0 ? 1 : -1;
    let path = `M${points[0]} ${points[1]} `;
    path += `H${points[2] - r} `;
    if (deltaY !== 0) {
      path += this.arcPath(sweep, 1);
      path += `V${points[5] - (deltaY > 0 ? r : -r)} `;
    } else {
      path += `h${r} `;
    }
    sweep = deltaY > 0 ? -1 : 1;
    if (deltaY !== 0) path += this.arcPath(sweep, -1);
    else path += `h${r} `;

    path += `H${points[6]} `;
    return path;
  }

  public arcPath(sweep: number, invert: number) {
    const r = this.prereqRadius;
    return `a${r} ${r} 0 0 ${sweep > 0 ? 1 : 0} ${r} ${sweep > 0 ? r * invert : -r * invert} `;
  }

  public columnToPixel(column: number, era: Era) {
    return (this.nodeWidth + this.nodeHGap) * column + this.eraGap * era;
  }

  public rowToPixel(row: number) {
    return (this.nodeHeight + this.nodeVGap) * row;
  }
}
