export enum JourneyActionType {
  ADD_JOURNEY = 'ADD_JOURNEY',
  CLEAR_JOURNEY = 'CLEAR_JOURNEY',
  DELETE_JOURNEY = 'DELETE_JOURNEY',
}

export interface JourneyAction {
  type: JourneyActionType
}