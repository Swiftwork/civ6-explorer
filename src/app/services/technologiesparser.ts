
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Era, TreeNode } from '../models/tree-node.model';
import { IBoostRow } from '../models/xml/shared';
import { ITechnologies, ITechnologyPrereqsRow, ITechnologyRow } from '../models/xml/technologies';
import { XmlReader } from './xmlreader';

@Injectable()
export class TechnologiesParser {

  public Technologies: TreeNode[] = [];

  constructor(private xmlReader: XmlReader) {
    this.loadTechnologies();
  }

  public loadTechnologies() {
    this.xmlReader.read('/assets/data/BaseGame/Technologies.xml').subscribe((data: ITechnologies) => {
      console.log('technology from json', data);
      for (let i = 0; i < data.GameInfo.Technologies.Row.length; i++) {
        let technologyrow = data.GameInfo.Technologies.Row[i].$ as ITechnologyRow;
        this.Technologies.push(new TreeNode(
          technologyrow.TechnologyType,
          technologyrow.Name, //ToDo: Update to proper value
          technologyrow.Description, //ToDo:  Update to proper value
          +technologyrow.Cost,
          technologyrow.AdvisorType, //ToDo: Update to proper value
          this.getEraType(technologyrow.EraType),
          +technologyrow.UITreeRow + 3, //ToDo: Modify to match renderer
          this.getPreReqs(technologyrow.TechnologyType, data.GameInfo.TechnologyPrereqs.Row),
          this.getBoost(technologyrow.TechnologyType, data.GameInfo.Boosts.Row),
          false, //ToDo: Find
        ));
      }
      console.log('tech parsed', this.Technologies);
    });
  }

  private getBoost(tech: string, boosts: any[]): IBoostRow {
    for (let i = 0; i < boosts.length; i++) {
      let boostRow = boosts[i].$ as IBoostRow;
      if (boostRow.TechnologyType === tech) return boostRow;
    }
    return null;
  }

  private getPreReqs(tech: string, prereqs: any[]): string[] {
    let techPrereqs = [];
    for (let i = 0; i < prereqs.length; i++) {
      let prereq = prereqs[i].$ as ITechnologyPrereqsRow;
      if (prereq.Technology === tech) techPrereqs.push(prereq.PrereqTech);
    }
    return techPrereqs;
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

}
