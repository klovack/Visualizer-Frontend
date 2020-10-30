import { Filter } from "../models/filter";
import { Journey } from "../models/journey";
import { Vendor } from "../models/vendor";
import { FilterAction, FilterActionType, JourneyAction, JourneyActionType, VendorAction, VendorActionType } from "./actions";

/**
 * Reducer for vendor
 * @param state Vendor state to be processed
 * @param action action which has to have type
 */
export const vendorReducer = (state: Vendor[] = [], action: VendorAction) => {
  switch (action.type) {
    case VendorActionType.ADD_VENDOR:
      return state;
  
    case VendorActionType.REMOVE_VENDOR:
      return state;

    case VendorActionType.CLEAR_VENDOR:
      return [];
      
    default:
      return state;
  }
}

/**
 * Reducer for journey
 * @param state 
 * @param action 
 */
export const journeyReducer = (state: Journey[] = [], action: JourneyAction) => {
  switch (action.type) {
    case JourneyActionType.ADD_JOURNEY:
      return {
        ...state,
        ...action.journeys,    
      };

    case JourneyActionType.REMOVE_JOURNEY:
      if (action.toBeRemovedIds.length <= 0) {
        return state;
      }

      return state.filter(({id}) => {
          for (let i = 0; i < action.toBeRemovedIds.length; i++) {
            const delId = action.toBeRemovedIds[i];
            if (delId === id) {
              return true;
            }
          }

          return false;
      });

    case JourneyActionType.CLEAR_JOURNEY:
      return [];
  
    default:
      return state;
  }
}


/**
 * Empty filter
 */
const defaultFilterState: Filter = {
  vendors: '',
  timeStart: undefined,
  timeEnd: undefined,
  isUnlimited: false,
  limit: 20
}

/**
 * Reducer for filter
 * @param state 
 * @param action 
 */
export const filterReducer = (state = defaultFilterState, action: FilterAction) => {
  switch (action.type) {
    case FilterActionType.SET_FILTER:
      return {
        ...state,
        ...action.filter,
      };

    case FilterActionType.CLEAR_FILTER:
      return defaultFilterState;

    default:
      return state;
  }
}