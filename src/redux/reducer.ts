import { Filter } from "../models/filter";
import { Journey } from "../models/journey";
import { FilterAction, FilterActionType, JourneyAction, JourneyActionType } from "./actions";

export const journeyReducer = (state: Journey[] = [], action: JourneyAction) => {
  switch (action.type) {
    case JourneyActionType.ADD_JOURNEY:
      return state;

    case JourneyActionType.CLEAR_JOURNEY:
      return state;

    case JourneyActionType.DELETE_JOURNEY:
      return state;
  
    default:
      return state;
  }
}

const defaultFilterState: Filter = {
  vendors: '',
  timeStart: undefined,
  timeEnd: undefined,
  isUnlimited: false,
  limit: 20
}

export const filterReducer = (state = defaultFilterState, action: FilterAction) => {
  switch (action.type) {
    case FilterActionType.SET_FILTER:
      return state;

    case FilterActionType.CLEAR_FILTER:
      return state;

    default:
      return state;
  }
}