export enum JourneyActionType {
  ADD_JOURNEY = 'ADD_JOURNEY',
  CLEAR_JOURNEY = 'CLEAR_JOURNEY',
  DELETE_JOURNEY = 'DELETE_JOURNEY',
  NONE = 'NONE',
}

export interface JourneyAction {
  type: JourneyActionType
}

export enum FilterActionType {
  SET_FILTER = 'SET_FILTER',
  CLEAR_FILTER = 'CLEAR_FILTER',
  NONE = 'NONE',
}

export interface FilterAction {
  type: FilterActionType,
}