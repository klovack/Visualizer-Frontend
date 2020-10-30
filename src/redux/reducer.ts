import { Journey } from "../models/journey";
import { JourneyAction, JourneyActionType } from "./actions";

export const journeyReducer = (state: Journey[], action: JourneyAction) => {
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