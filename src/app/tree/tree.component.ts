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

  @ViewChild('treeRef') treeRef: ElementRef;

  public nodes: TreeNode[] = Civics;
  public jsonCivics: TreeNode[] = [];

  private treeRows = 8;
  private treeHeight = 0;
  private rowHeight = 0;

  constructor(private xmlReader: XmlReader) { }

  ngOnInit() {
    this.xmlReader.read('/assets/data/BaseGame/Civics.xml').subscribe((data: ICivicsJson) => {
      console.log('civics from json', data);

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
      console.log('civics parsed', this.jsonCivics);
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
        return Era.ERA_ANCIENT;
      case 'ERA_ANCIENT':
      default:
        return Era.ERA_ANCIENT;
    }
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
