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
    public CivicType: string,
    public Name: string,
    public Description: string,
    public Cost: number,
    public AdvisorType: string,
    public EraType: string,
    public UITreeRow: number,
    public Prereq?: string[],
    public Boost?: string,
    public Repeatable?: boolean,
  ) { }
}
