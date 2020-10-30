import { Filter } from "../models/filter";
import { IJourney, Journey } from "../models/journey";
import { IVendor, Vendor } from "../models/vendor";


/* VENDOR ACTIONS */

export enum VendorActionType {
  ADD_VENDOR = 'ADD_VENDOR',
  CLEAR_VENDOR = 'CLEAR_VENDOR',
  REMOVE_VENDOR = 'REMOVE_VENDOR',
  NONE = 'NONE'
}

export interface VendorAction {
  type: VendorActionType,
  vendors?: Vendor[],
  toBeRemovedIds?: number[],
}

export const addVendor = (...values: IVendor[]) => {
  const type = VendorActionType.ADD_VENDOR;

  const vendors: Vendor[] = []

  values.forEach(value => {
    vendors.push (new Vendor(
      value.id, 
      value.name
    ))
  });

  return {
    type,
    vendors,
  }
};

export const removeVendor = (...toBeRemovedIds: number[]) => ({
  type: VendorActionType.REMOVE_VENDOR,
  toBeRemovedIds,
});

export const clearVendor = () => ({
  type: VendorActionType.CLEAR_VENDOR,
});



/* JOURNEY ACTION */

export enum JourneyActionType {
  ADD_JOURNEY = 'ADD_JOURNEY',
  CLEAR_JOURNEY = 'CLEAR_JOURNEY',
  REMOVE_JOURNEY = 'REMOVE_JOURNEY',
  NONE = 'NONE',
}

export interface JourneyAction {
  type: JourneyActionType,
  journeys?: Journey[],
  toBeRemovedIds?: number[],
}


/**
 * Action to remove journey
 * @param values 
 */
export const addJourney = (...values: IJourney[]) => {
  const type = JourneyActionType.ADD_JOURNEY;

  const journeys: Journey[] = []

  values.forEach(value => {
    journeys.push (new Journey(
      value.id, 
      value.vendorId, 
      value.passengerCount,
      value.distance,
      value.pickupLocation,
      value.dropoffLocation,
      value.pickupTime,
      value.dropoffTime,
      value.fare_amount,
    ))
  });

  return {
    type,
    journeys,
  }
};

/**
 * Action to remove journey.
 * @param toBeRemovedIds rest param
 * 
 * @returns JourneyAction
 */
export const removeJourney = (...toBeRemovedIds: number[]) => ({
  type: JourneyActionType.REMOVE_JOURNEY,
  toBeRemovedIds,
});

/**
 * Action to remove journey
 */
export const clearJourney = () => ({
  type: JourneyActionType.CLEAR_JOURNEY,
});



export enum FilterActionType {
  SET_FILTER = 'SET_FILTER',
  CLEAR_FILTER = 'CLEAR_FILTER',
  NONE = 'NONE',
}

export interface FilterAction {
  type: FilterActionType,
  filter?: Filter,
}

/**
 * Set filter action
 * @param value new Filter which you want to set
 */
export const setFilter = (value: Filter) => ({
  type: FilterActionType.SET_FILTER,
  filter: value,
});

/**
 * Action to clear filter
 */
export const clearFilter = () => ({
  type: FilterActionType.CLEAR_FILTER,
});