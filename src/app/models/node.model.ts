import { Ability } from './ability.model';
import { Diplomacy } from './diplomacy.model';
import { District } from './district.model';
import { Envoy } from './envoy.model';
import { Government } from './government.model';
import { Governor } from './governor.model';
import { Policy } from './policy.model';
import { Unit } from './unit.model';
import { Wonder } from './wonder.model';

export class TreeNode {
  constructor(
    public title: string,
    public benefit: (Policy | Unit | Wonder | Government | District | Envoy | Governor | Diplomacy | Ability)[],
    public dependencies: TreeNode[],
    public production: number,
    public inspiration: string,
  ) { }
}
