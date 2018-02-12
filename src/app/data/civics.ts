import { TreeNode } from '../models/node.model';

import { Ability } from '../models/ability.model';
import { Diplomacy } from '../models/diplomacy.model';
import { District } from '../models/district.model';
import { Envoy } from '../models/envoy.model';
import { Government } from '../models/government.model';
import { Governour } from '../models/governour.model';
import { Policy } from '../models/policy.model';
import { Unit } from '../models/unit.model';
import { Wonder } from '../models/wonder.model';

/* Policies */
import {
  GodKing, UrbanPlanning
} from './policies';

export const Civics: TreeNode[] = [];

export const CodeOfLaws = new TreeNode(
  'Code of Laws',
  [GodKing, UrbanPlanning],
  [],
  0,
  ''
);

export const Craftsmanship = new TreeNode(
  'Craftsmanship',
  [],
  [CodeOfLaws],
  0,
  'Improve 3 tiles'

);

export const ForeignTrade = new TreeNode(
  'Foreign Trade',
  [],
  [CodeOfLaws],
  0,
  'Discover a second continent'
);

Civics.push(
  CodeOfLaws, Craftsmanship, ForeignTrade
)
