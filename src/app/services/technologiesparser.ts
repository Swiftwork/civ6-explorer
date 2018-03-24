
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { Era, TreeNode } from '../models/tree-node.model';
import { IBoostRow } from '../models/xml/shared';
import { ITechnologies, ITechnologyPrereqsRow, ITechnologyRow } from '../models/xml/technologies';
import { XmlReader } from './xmlreader';

@Injectable()
export class TechnologiesParser {

  protected _technologies = new BehaviorSubject<TreeNode[]>([]);
  public technologies = this._technologies.asObservable();

  constructor(private xmlReader: XmlReader) {
    this.loadTechnologies();
  }

  public loadTechnologies() {
    this.xmlReader.read('/assets/data/BaseGame/Technologies.xml').subscribe((data: ITechnologies) => {
      const technologies = [];
      for (let i = 0; i < data.GameInfo.Technologies.Row.length; i++) {
        let technologyRow = data.GameInfo.Technologies.Row[i].$ as ITechnologyRow;
        technologies.push(new TreeNode(
          technologyRow.TechnologyType,
          technologyRow.Name, //ToDo: Update to proper value
          technologyRow.Description, //ToDo:  Update to proper value
          +technologyRow.Cost,
          technologyRow.AdvisorType, //ToDo: Update to proper value
          this.getEraType(technologyRow.EraType),
          +technologyRow.UITreeRow + 3, //ToDo: Modify to match renderer
          this.getPreReqs(technologyRow.TechnologyType, data.GameInfo.TechnologyPrereqs.Row),
          this.getBoost(technologyRow.TechnologyType, data.GameInfo.Boosts.Row),
          false, //ToDo: Find
        ));
      }
      this._technologies.next(technologies);
    });
  }

  private getBoost(tech: string, boosts: any[]): string {
    for (let i = 0; i < boosts.length; i++) {
      let boostRow = boosts[i].$ as IBoostRow;
      if (boostRow.TechnologyType === tech) return boostRow.TriggerDescription;
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
