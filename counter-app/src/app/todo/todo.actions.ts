import { createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';

// Add a new todo
export const addTodo = createAction(
  '[Todo] Add',
  props<{ todo: Todo }>() // Payload: Todo object
);

// Toggle todo completion status
export const toggleTodo = createAction(
  '[Todo] Toggle',
  props<{ id: string }>() // Payload: Todo ID
);

// Delete a todo
export const deleteTodo = createAction(
  '[Todo] Delete',
  props<{ id: string }>() // Payload: Todo ID
);
