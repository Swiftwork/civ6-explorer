export interface ICivicsJson {
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

export interface ICivicRow {
  AdvisorType: string,
  CivicType: string,
  Cost: string,
  EraType: string,
  Name: string,
  UITreeRow: string,
}

export interface ICivicPrereqs {
  Row: IRow[]
}

export interface ICivicPrereqsRow {
  Civic: string,
  PrereqCivic: string,
}

export interface IRow {
  Row: any[],
}
