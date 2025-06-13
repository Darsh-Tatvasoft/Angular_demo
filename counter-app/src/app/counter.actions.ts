import { createAction, props } from '@ngrx/store';

// Action to increment counter
export const increment = createAction('[Counter] Increment');

// Action to decrement counter
export const decrement = createAction('[Counter] Decrement');

// Action to reset counter
export const reset = createAction('[Counter] Reset');

// Action to set a specific value
export const setValue = createAction(
  '[Counter] Set Value',
  props<{ value: number }>() // Payload (data sent with the action)
);
