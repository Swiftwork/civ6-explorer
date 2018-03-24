import { INodeRow, IRow } from './shared';

export interface ITechnologies {
  GameInfo: {
    BoostNames: IRow,
    Boosts: IRow,
    Kinds: IRow,
    ModifierArguments: IRow,
    Modifiers: IRow,
    Technologies: IRow,
    TechnologyModifiers: IRow,
    TechnologyPrereqs: IRow,
    TechnologyQuotes: IRow,
    Types: IRow,
  }
}

export interface ITechnologyRow extends INodeRow {
  TechnologyType: string,
  Description: string,
}

export interface ITechnologyPrereqs {
  Row: IRow[]
}

export interface ITechnologyPrereqsRow {
  Technology: string,
  PrereqTech: string,
}
