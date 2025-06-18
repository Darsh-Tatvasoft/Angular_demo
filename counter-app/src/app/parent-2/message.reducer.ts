import { createReducer, on } from '@ngrx/store';
import * as MessageActions from './message.actions';

export const initialState = '';

export const messageReducer = createReducer(
  initialState,
  on(MessageActions.sendMessage, (state, { message }) => message)
);
