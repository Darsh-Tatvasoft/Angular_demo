import { createAction, props } from '@ngrx/store';

export const sendMessage = createAction(
  '[Message] Send',
  props<{ message: string }>()
);
