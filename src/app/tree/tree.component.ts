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
  public jsonCivics: TreeNode[];

  private rows = 9;

  public exampleCivic: TreeNode = new TreeNode('CIVIC_CODE_OF_LAWS', 'LOC_CIVIC_CODE_OF_LAWS_NAME', '', 20, 'ADVISOR_GENERIC', Era.ERA_ANCIENT, 0, [], '');

  constructor(private xmlReader: XmlReader) { }

  ngOnInit() {
    this.xmlReader.read('/assets/data/BaseGame/Civics.xml').subscribe((data: ICivicsJson) => {
      console.log('civics from json', data);

      for (let i = 0; i < data.GameInfo.Civics.Row.length; i++) {
        let civicrow = data.GameInfo.Civics.Row[i] as ICivicRow;
        this.jsonCivics.push(new TreeNode(
          civicrow.CivicType,
          civicrow.Name,
          'Description',
          +civicrow.Cost,
          civicrow.AdvisorType,
          this.getEraType(civicrow.EraType),
          +civicrow.UITreeRow + 3,
          ['Prereq'],
          'Boost',
          false,
        ));
        console.log(i);
      }
      console.log('civics parsed', this.jsonCivics);
    });
    console.log(this.nodes);
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

  public layout(row: number, cost: number, era: Era) {
  }

}

interface ICivicsJson {
  GameInfo: {
    Boosts: IRow,
    CivicModifiers: IRow,
    CivicPrereqs: IRow,
    CivicQuotes: IRow,
    Civics: IRow,
    Kinds: IRow,
    ModifierArguments: IRow,
    Modifiers: IRow,
    RequirementArguments: IRow,
    RequirementSetRequirements: IRow,
    RequirementSets: IRow,
    Requirements: IRow,
    Types: IRow,
  }
}

interface ICivicRow {
  AdvisorType: string,
  CivicType: string,
  Cost: string,
  EraType: string,
  Name: string,
  UITreeRow: string,
}

interface IRow {
  Row: any[],
}
