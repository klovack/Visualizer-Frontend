import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { filterReducer, journeyReducer, vendorReducer } from './reducer';

const reducer = combineReducers({
  journeys: journeyReducer,
  filter: filterReducer,
  vendors: vendorReducer,
});

export default createStore(reducer);