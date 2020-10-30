import { createStore } from 'redux';
import { journeyReducer } from './reducer';

export const journeyStore = createStore(journeyReducer);