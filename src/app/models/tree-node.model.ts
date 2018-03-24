import { Ability } from './civics/ability.model';
import { Diplomacy } from './civics/diplomacy.model';
import { District } from './civics/district.model';
import { Envoy } from './civics/envoy.model';
import { Government } from './civics/government.model';
import { Governor } from './civics/governor.model';
import { Policy } from './civics/policy.model';
import { Unit } from './civics/unit.model';
import { Wonder } from './civics/wonder.model';
import { IBoostRow } from './xml/shared';

export enum Era {
  ERA_ANCIENT,
  ERA_CLASSICAL,
  ERA_MEDIEVAL,
  ERA_RENAISSANCE,
  ERA_INDUSTRIAL,
  ERA_MODERN,
  ERA_ATOMIC,
  ERA_INFORMATION,
}

export class TreeNode {
  public column = 0;

  constructor(
    public type: string,
    public name: string,
    public description: string,
    public cost: number,
    public advisor: string,
    public era: Era,
    public row: number,
    public prereq: string[] = [],
    public boost = '',
    public repeatable = false,
  ) { }
}
