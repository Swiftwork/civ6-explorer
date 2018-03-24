
// ___                                      .-~. /_"-._
// `-._~-.                                  / /_ "~o\  :Y
//     \  \                                / : \~x.  ` ')
//      ]  Y                              /  |  Y< ~-.__j
//     /   !                        _.--~T : l  l<  /.-~
//    /   /                 ____.--~ .   ` l /~\ \<|Y
//   /   /             .-~~"        /| .    ',-~\ \L|
//  /   /             /     .^   \ Y~Y \.^>/l_   "--'
// /   Y           .-"(  .  l__  j_j l_/ /~_.-~    .
// Y    l          /    \  )    ~~~." / `/"~ / \.__/l_
// |     \     _.-"      ~-{__     l  :  l._Z~-.___.--~
// |      ~---~           /   ~~"---\_  ' __[>
// l  .                _.^   ___     _>-y~
// \  \     .      .-~   .-~   ~>--"  /
//  \  ~---"            /     ./  _.-'
//   "-.,_____.,_  _.--~\     _.-~
//               ~~     (   _}       -Row
//                      `. ~(
//                        )  \
//                       /,`--'~\--'~\
//             ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// You found the dinosaur. He doesn't do anything, but he looks kinda fierce!

export interface IRow {
  Row: any[],
}

export interface INodeRow {
  AdvisorType: string,
  Cost: string,
  EraType: string,
  Name: string,
  UITreeRow: string,
}

export interface IBoostRow {
  Boost: string,
  BoostClass: string,
  BoostingCivicType: string, //Ta bort?
  BoostingTechType: string, //Ta bort?
  CivicType: string, //Ta bort?
  DistrictType: string,
  ImprovementType: string,
  NumItems: string,
  RequiresResource: string,
  ResourceType: string,
  TechnologyType: string, //Ta bort?
  TriggerDescription: string,
  TriggerLongDescription: string,
  Unit1Type: string,
}
