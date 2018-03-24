
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Era, TreeNode } from '../models/tree-node.model';
import { ICivicPrereqs, ICivicPrereqsRow, ICivicRow, ICivics } from '../models/xml/civics';
import { IBoostRow } from '../models/xml/shared';
import { XmlReader } from './xmlreader';

@Injectable()
export class CivicParser {

  protected _civics = new BehaviorSubject<TreeNode[]>([]);
  public civics = this._civics.asObservable();

  constructor(private xmlReader: XmlReader) {
    this.loadCivics();
  }

  public loadCivics() {
    this.xmlReader.read('/assets/data/BaseGame/Civics.xml').subscribe((data: ICivics) => {
      const civics = [];
      for (let i = 0; i < data.GameInfo.Civics.Row.length; i++) {
        let civicrow = data.GameInfo.Civics.Row[i].$ as ICivicRow;
        civics.push(new TreeNode(
          civicrow.CivicType,
          civicrow.Name.slice(4), //ToDo: Update to proper value
          'Description', //ToDo: Find
          +civicrow.Cost,
          civicrow.AdvisorType, //ToDo: Update to proper value
          this.getEraType(civicrow.EraType),
          +civicrow.UITreeRow + 3, //ToDo: Modify to match renderer
          this.getPreReqs(civicrow.CivicType, data.GameInfo.CivicPrereqs.Row),
          this.getBoost(civicrow.CivicType, data.GameInfo.Boosts.Row),
          false, //ToDo: Find
        ));
      }
      this._civics.next(civics);
    });
  }

  private getBoost(civic: string, boosts: any[]): string {
    for (let i = 0; i < boosts.length; i++) {
      let boostRow = boosts[i].$ as IBoostRow;
      if (boostRow.CivicType === civic) return boostRow.TriggerDescription;
    }
    return null;
  }

  private getPreReqs(civic: string, prereqs: any[]): string[] {
    let civicPrereqs = [];
    for (let i = 0; i < prereqs.length; i++) {
      let prereq = prereqs[i].$ as ICivicPrereqsRow;
      if (prereq.Civic === civic) civicPrereqs.push(prereq.PrereqCivic);
    }
    return civicPrereqs;
  }

  private getEraType(era: string): Era {
    switch (era) {
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

}
