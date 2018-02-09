import { Policy } from './policy.model';
import { Unit } from './unit.model';
import { Wonder } from './wonder.model';
import { Government } from './government.model';
import { District } from './district.model';
import { Envoy } from './envoy.model';
import { Governour } from './governour.model';
import { Diplomacy } from './diplomacy.model';
import { Ability } from './ability.model';

export class TreeNode {
  constructor(
    public title: string,
    public benefit: (Policy | Unit | Wonder | Government | District | Envoy | Governour | Diplomacy | Ability)[],
    public dependencies: TreeNode[],
    public production: number,
    public inspiration: string,
  ) { };
}
