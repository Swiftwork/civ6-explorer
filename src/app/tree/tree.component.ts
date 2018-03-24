import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Civics } from '../data/civics';
import { Era, TreeNode } from '../models/tree-node.model';
import { ICivicPrereqs, ICivicPrereqsRow, ICivicRow, ICivicsJson } from '../models/xml/civics';
import { XmlReader } from '../services/xmlreader';

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
  public jsonCivics: TreeNode[] = [];

  protected eras = {};

  protected treeRows = 8;
  protected treeHeight = 0;
  protected rowHeight = 0;
  protected nodeWidth = 256;

  constructor(protected xmlReader: XmlReader) { }

  ngOnInit() {
    this.xmlReader.read('/assets/data/BaseGame/Civics.xml').subscribe((data: ICivicsJson) => {
      //console.log('civics from json', data);

      for (let i = 0; i < data.GameInfo.Civics.Row.length; i++) {
        let civicrow = data.GameInfo.Civics.Row[i].$ as ICivicRow;
        // console.log(i, civicrow);
        this.jsonCivics.push(new TreeNode(
          civicrow.CivicType,
          civicrow.Name,
          'Description',
          +civicrow.Cost,
          civicrow.AdvisorType,
          this.getEraType(civicrow.EraType),
          +civicrow.UITreeRow + 3,
          this.getPreReqs(civicrow.CivicType, data.GameInfo.CivicPrereqs.Row),
          'Boost',
          false,
        ));
      }

      this.generateCivicColumns(this.jsonCivics);
      //console.log('civics parsed', this.jsonCivics);
    });
  }

  private getPreReqs(civic: string, prereqs: any[]): string[] {
    let civicPrereqs = [];
    for (let i = 0; i < prereqs.length; i++) {
      let prereq = prereqs[i].$ as ICivicPrereqsRow;
      if (prereq.Civic === civic) civicPrereqs.push(prereq.PrereqCivic);
    }
    return civicPrereqs;
  }

  private getEraType(eratype: string): Era {
    switch (eratype) {
      case 'ERA_INFORMATION':
        return Era.ERA_INFORMATION;
      case 'ERA_ATOMIC':
        return Era.ERA_ATOMIC;
      case 'ERA_MODERN':
        return Era.ERA_MODERN;
      case 'ERA_INDUSTRIAL':
        return Era.ERA_INDUSTRIAL;
      case 'ERA_RENAISSANCE':
        return Era.ERA_RENAISSANCE;
      case 'ERA_MEDIEVAL':
        return Era.ERA_MEDIEVAL;
      case 'ERA_CLASSICAL':
        return Era.ERA_CLASSICAL;
      case 'ERA_ANCIENT':
      default:
        return Era.ERA_ANCIENT;
    }
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
