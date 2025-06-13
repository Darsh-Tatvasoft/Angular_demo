import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

// Initial state (counter starts at 0)
export const initialState = 0;

// Reducer function (handles state changes)
export const counterReducer = createReducer(
  initialState,
  // When "increment" action is dispatched, increase state by 1
  on(CounterActions.increment, (state) => state + 1),

  // When "decrement" action is dispatched, decrease state by 1
  on(CounterActions.decrement, (state) => state - 1),

  // When "reset" action is dispatched, return to 0
  on(CounterActions.reset, () => 0),

  // When "setValue" action is dispatched, update state with payload
  on(CounterActions.setValue, (state, { value }) => value)
);
