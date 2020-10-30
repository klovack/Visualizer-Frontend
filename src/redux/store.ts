import { combineReducers } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { filterReducer, journeyReducer } from './reducer';

const reducer = combineReducers({
  journeys: journeyReducer,
  filter: filterReducer,
});

export default createStore(reducer);