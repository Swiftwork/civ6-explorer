import { INodeRow, IRow } from './shared';

export interface ICivics {
  GameInfo: {
    Boosts: IRow,
    CivicModifiers: IRow,
    CivicPrereqs: IRow,
    CivicQuotes: IRow,
    Civics: IRow,
    Kinds: IRow,
    ModifierArguments: IRow,
    Modifiers: IRow,
    RequirementArguments: IRow,
    RequirementSetRequirements: IRow,
    RequirementSets: IRow,
    Requirements: IRow,
    Types: IRow,
  }
}

export interface ICivicRow extends INodeRow {
  CivicType: string,
}

export interface ICivicPrereqs {
  Row: IRow[]
}

export interface ICivicPrereqsRow {
  Civic: string,
  PrereqCivic: string,
}
