import { Ability } from './civics/ability.model';
import { Diplomacy } from './civics/diplomacy.model';
import { District } from './civics/district.model';
import { Envoy } from './civics/envoy.model';
import { Government } from './civics/government.model';
import { Governor } from './civics/governor.model';
import { Policy } from './civics/policy.model';
import { Unit } from './civics/unit.model';
import { Wonder } from './civics/wonder.model';

export class TreeNode {
  constructor(
    CivicType: string,
    Name: string,
    Description: string,
    Cost: number,
    AdvisorType: string,
    EraType: string,
    UITreeRow: number,
    Prereq?: string[],
    Boost?: string,
    Repeatable?: boolean,
  ) { }
}
