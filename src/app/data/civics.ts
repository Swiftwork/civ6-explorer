import { Era, TreeNode } from '../models/tree-node.model';

import { Ability } from '../models/civics/ability.model';
import { Diplomacy } from '../models/civics/diplomacy.model';
import { District } from '../models/civics/district.model';
import { Envoy } from '../models/civics/envoy.model';
import { Government } from '../models/civics/government.model';
import { Governor } from '../models/civics/governor.model';
import { Policy } from '../models/civics/policy.model';
import { Unit } from '../models/civics/unit.model';
import { Wonder } from '../models/civics/wonder.model';

/* Policies */
import {
  GodKing, UrbanPlanning,
} from './policies';

export const Civics: TreeNode[] = [

  /*  Ancient Era */
  new TreeNode('CIVIC_CODE_OF_LAWS', 'LOC_CIVIC_CODE_OF_LAWS_NAME', '', 20, 'ADVISOR_GENERIC', Era.ERA_ANCIENT, 0, [], ''),
  new TreeNode('CIVIC_CRAFTSMANSHIP', 'LOC_CIVIC_CRAFTSMANSHIP_NAME', '', 40, 'ADVISOR_GENERIC', Era.ERA_ANCIENT, -2, [], ''),
  new TreeNode('CIVIC_FOREIGN_TRADE', 'LOC_CIVIC_FOREIGN_TRADE_NAME', 'LOC_CIVIC_FOREIGN_TRADE_DESCRIPTION', 40, 'ADVISOR_GENERIC', Era.ERA_ANCIENT, 2, [], ''),
  new TreeNode('CIVIC_MILITARY_TRADITION', 'LOC_CIVIC_MILITARY_TRADITION_NAME', 'LOC_CIVIC_MILITARY_TRADITION_DESCRIPTION', 50, 'ADVISOR_CONQUEST', Era.ERA_ANCIENT, -3, [], ''),
  new TreeNode('CIVIC_STATE_WORKFORCE', 'LOC_CIVIC_STATE_WORKFORCE_NAME', '', 70, 'ADVISOR_GENERIC', Era.ERA_ANCIENT, 0, [], ''),
  new TreeNode('CIVIC_EARLY_EMPIRE', 'LOC_CIVIC_EARLY_EMPIRE_NAME', 'LOC_CIVIC_EARLY_EMPIRE_DESCRIPTION', 70, 'ADVISOR_GENERIC', Era.ERA_ANCIENT, 1, [], ''),
  new TreeNode('CIVIC_MYSTICISM', 'LOC_CIVIC_MYSTICISM_NAME', '', 50, 'ADVISOR_RELIGIOUS', Era.ERA_ANCIENT, 3, [], ''),

  /* Classical Era */
  new TreeNode('CIVIC_GAMES_RECREATION', 'LOC_CIVIC_GAMES_RECREATION_NAME', '', 110, 'ADVISOR_GENERIC', Era.ERA_CLASSICAL, -2, [], ''),
  new TreeNode('CIVIC_POLITICAL_PHILOSOPHY', 'LOC_CIVIC_POLITICAL_PHILOSOPHY_NAME', '', 110, 'ADVISOR_GENERIC', Era.ERA_CLASSICAL, 0, [], ''),
  new TreeNode('CIVIC_DRAMA_POETRY', 'LOC_CIVIC_DRAMA_POETRY_NAME', '', 110, 'ADVISOR_CULTURE', Era.ERA_CLASSICAL, 2, [], ''),
  new TreeNode('CIVIC_MILITARY_TRAINING', 'LOC_CIVIC_MILITARY_TRAINING_NAME', '', 120, 'ADVISOR_CONQUEST', Era.ERA_CLASSICAL, -3, [], ''),
  new TreeNode('CIVIC_DEFENSIVE_TACTICS', 'LOC_CIVIC_DEFENSIVE_TACTICS_NAME', '', 175, 'ADVISOR_GENERIC', Era.ERA_CLASSICAL, -1, [], ''),
  new TreeNode('CIVIC_RECORDED_HISTORY', 'LOC_CIVIC_RECORDED_HISTORY_NAME', '', 175, 'ADVISOR_TECHNOLOGY', Era.ERA_CLASSICAL, 1, [], ''),
  new TreeNode('CIVIC_THEOLOGY', 'LOC_CIVIC_THEOLOGY_NAME', '', 120, 'ADVISOR_RELIGIOUS', Era.ERA_CLASSICAL, 3, [], ''),

  /*  Medieval Era */
  new TreeNode('CIVIC_NAVAL_TRADITION', 'LOC_CIVIC_NAVAL_TRADITION_NAME', '', 200, 'ADVISOR_GENERIC', Era.ERA_MEDIEVAL, -2, [], ''),
  new TreeNode('CIVIC_FEUDALISM', 'LOC_CIVIC_FEUDALISM_NAME', 'LOC_CIVIC_FEUDALISM_DESCRIPTION', 275, 'ADVISOR_GENERIC', Era.ERA_MEDIEVAL, -1, [], ''),
  new TreeNode('CIVIC_CIVIL_SERVICE', 'LOC_CIVIC_CIVIL_SERVICE_NAME', '', 275, 'ADVISOR_GENERIC', Era.ERA_MEDIEVAL, 1, [], ''),
  new TreeNode('CIVIC_MERCENARIES', 'LOC_CIVIC_MERCENARIES_NAME', '', 290, 'ADVISOR_CONQUEST', Era.ERA_MEDIEVAL, -3, [], ''),
  new TreeNode('CIVIC_MEDIEVAL_FAIRES', 'LOC_CIVIC_MEDIEVAL_FAIRES_NAME', '', 385, 'ADVISOR_CULTURE', Era.ERA_MEDIEVAL, -1, [], ''),
  new TreeNode('CIVIC_GUILDS', 'LOC_CIVIC_GUILDS_NAME', '', 385, 'ADVISOR_GENERIC', Era.ERA_MEDIEVAL, 1, [], ''),
  new TreeNode('CIVIC_DIVINE_RIGHT', 'LOC_CIVIC_DIVINE_RIGHT_NAME', '', 290, 'ADVISOR_GENERIC', Era.ERA_MEDIEVAL, 3, [], ''),

  /*  Renaissance Era */
  new TreeNode('CIVIC_EXPLORATION', 'LOC_CIVIC_EXPLORATION_NAME', 'LOC_CIVIC_EXPLORATION_DESCRIPTION', 400, 'ADVISOR_GENERIC', Era.ERA_RENAISSANCE, -3, [], ''),
  new TreeNode('CIVIC_HUMANISM', 'LOC_CIVIC_HUMANISM_NAME', '', 540, 'ADVISOR_CULTURE', Era.ERA_RENAISSANCE, -1, [], ''),
  new TreeNode('CIVIC_DIPLOMATIC_SERVICE', 'LOC_CIVIC_DIPLOMATIC_SERVICE_NAME', 'LOC_CIVIC_DIPLOMATIC_SERVICE_DESCRIPTION', 540, 'ADVISOR_TECHNOLOGY', Era.ERA_RENAISSANCE, 1, [], ''),
  new TreeNode('CIVIC_REFORMED_CHURCH', 'LOC_CIVIC_REFORMED_CHURCH_NAME', '', 400, 'ADVISOR_CONQUEST', Era.ERA_RENAISSANCE, 3, [], ''),
  new TreeNode('CIVIC_MERCANTILISM', 'LOC_CIVIC_MERCANTILISM_NAME', 'LOC_CIVIC_MERCANTILISM_DESCRIPTION', 655, 'ADVISOR_GENERIC', Era.ERA_RENAISSANCE, -1, [], ''),
  new TreeNode('CIVIC_THE_ENLIGHTENMENT', 'LOC_CIVIC_THE_ENLIGHTENMENT_NAME', 'LOC_CIVIC_THE_ENLIGHTENMENT_DESCRIPTION', 655, 'ADVISOR_TECHNOLOGY', Era.ERA_RENAISSANCE, 1, [], ''),

  /* Industrial Era */
  new TreeNode('CIVIC_COLONIALISM', 'LOC_CIVIC_COLONIALISM_NAME', '', 725, 'ADVISOR_GENERIC', Era.ERA_INDUSTRIAL, -3, [], ''),
  new TreeNode('CIVIC_CIVIL_ENGINEERING', 'LOC_CIVIC_CIVIL_ENGINEERING_NAME', 'LOC_CIVIC_CIVIL_ENGINEERING_DESCRIPTION', 920, 'ADVISOR_GENERIC', Era.ERA_INDUSTRIAL, -1, [], ''),
  new TreeNode('CIVIC_NATIONALISM', 'LOC_CIVIC_NATIONALISM_NAME', 'LOC_CIVIC_NATIONALISM_DESCRIPTION', 920, 'ADVISOR_CONQUEST', Era.ERA_INDUSTRIAL, 0, [], ''),
  new TreeNode('CIVIC_OPERA_BALLET', 'LOC_CIVIC_OPERA_BALLET_NAME', '', 725, 'ADVISOR_CULTURE', Era.ERA_INDUSTRIAL, 2, [], ''),
  new TreeNode('CIVIC_NATURAL_HISTORY', 'LOC_CIVIC_NATURAL_HISTORY_NAME', '', 870, 'ADVISOR_CULTURE', Era.ERA_INDUSTRIAL, -3, [], ''),
  new TreeNode('CIVIC_SCORCHED_EARTH', 'LOC_CIVIC_SCORCHED_EARTH_NAME', '', 1060, 'ADVISOR_CONQUEST', Era.ERA_INDUSTRIAL, 2, [], ''),
  new TreeNode('CIVIC_URBANIZATION', 'LOC_CIVIC_URBANIZATION_NAME', '', 1060, 'ADVISOR_GENERIC', Era.ERA_INDUSTRIAL, -1, [], ''),

  /* Modern Era */
  new TreeNode('CIVIC_CONSERVATION', 'LOC_CIVIC_CONSERVATION_NAME', 'LOC_CIVIC_CONSERVATION_DESCRIPTION', 1255, 'ADVISOR_CULTURE', Era.ERA_MODERN, -3, [], ''),
  new TreeNode('CIVIC_CAPITALISM', 'LOC_CIVIC_CAPITALISM_NAME', '', 1560, 'ADVISOR_GENERIC', Era.ERA_MODERN, -2, [], ''),
  new TreeNode('CIVIC_NUCLEAR_PROGRAM', 'LOC_CIVIC_NUCLEAR_PROGRAM_NAME', '', 1715, 'ADVISOR_TECHNOLOGY', Era.ERA_MODERN, -2, [], ''),
  new TreeNode('CIVIC_MASS_MEDIA', 'LOC_CIVIC_MASS_MEDIA_NAME', '', 1410, 'ADVISOR_CULTURE', Era.ERA_MODERN, -1, [], ''),
  new TreeNode('CIVIC_MOBILIZATION', 'LOC_CIVIC_MOBILIZATION_NAME', 'LOC_CIVIC_MOBILIZATION_DESCRIPTION', 1410, 'ADVISOR_CONQUEST', Era.ERA_MODERN, 1, [], ''),
  new TreeNode('CIVIC_IDEOLOGY', 'LOC_CIVIC_IDEOLOGY_NAME', 'LOC_CIVIC_IDEOLOGY_DESCRIPTION', 660, 'ADVISOR_GENERIC', Era.ERA_MODERN, -1, [], ''),
  new TreeNode('CIVIC_SUFFRAGE', 'LOC_CIVIC_SUFFRAGE_NAME', '', 1715, 'ADVISOR_GENERIC', Era.ERA_MODERN, 0, [], ''),
  new TreeNode('CIVIC_TOTALITARIANISM', 'LOC_CIVIC_TOTALITARIANISM_NAME', '', 1715, 'ADVISOR_GENERIC', Era.ERA_MODERN, 2, [], ''),
  new TreeNode('CIVIC_CLASS_STRUGGLE', 'LOC_CIVIC_CLASS_STRUGGLE_NAME', '', 1715, 'ADVISOR_TECHNOLOGY', Era.ERA_MODERN, 3, [], ''),

  /* Atomic Era */
  new TreeNode('CIVIC_COLD_WAR', 'LOC_CIVIC_COLD_WAR_NAME', 'LOC_CIVIC_COLD_WAR_DESCRIPTION', 2185, 'ADVISOR_CULTURE', Era.ERA_ATOMIC, -1, [], ''),
  new TreeNode('CIVIC_PROFESSIONAL_SPORTS', 'LOC_CIVIC_PROFESSIONAL_SPORTS_NAME', '', 2185, 'ADVISOR_GENERIC', Era.ERA_ATOMIC, 2, [], ''),
  new TreeNode('CIVIC_CULTURAL_HERITAGE', 'LOC_CIVIC_CULTURAL_HERITAGE_NAME', '', 1955, 'ADVISOR_CULTURE', Era.ERA_ATOMIC, -3, [], ''),
  new TreeNode('CIVIC_RAPID_DEPLOYMENT', 'LOC_CIVIC_RAPID_DEPLOYMENT_NAME', 'LOC_CIVIC_RAPID_DEPLOYMENT_DESCRIPTION', 2415, 'ADVISOR_CONQUEST', Era.ERA_ATOMIC, -1, [], ''),
  new TreeNode('CIVIC_SPACE_RACE', 'LOC_CIVIC_SPACE_RACE_NAME', '', 2415, 'ADVISOR_CULTURE', Era.ERA_ATOMIC, 1, [], ''),

  /* Information Era */
  new TreeNode('CIVIC_GLOBALIZATION', 'LOC_CIVIC_GLOBALIZATION_NAME', 'LOC_CIVIC_GLOBALIZATION_DESCRIPTION', 2880, 'ADVISOR_TECHNOLOGY', Era.ERA_INFORMATION, 0, [], ''),
  new TreeNode('CIVIC_SOCIAL_MEDIA', 'LOC_CIVIC_SOCIAL_MEDIA_NAME', '', 2880, 'ADVISOR_CULTURE', Era.ERA_INFORMATION, 2, [], ''),
  new TreeNode('CIVIC_FUTURE_CIVIC', 'LOC_CIVIC_FUTURE_CIVIC_NAME', 'LOC_CIVIC_FUTURE_CIVIC_DESCRIPTION', 3200, 'ADVISOR_CULTURE', Era.ERA_INFORMATION, 1, [], '', true),

];
