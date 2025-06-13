import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';

// NgRx Entity adapter (simplifies CRUD operations)
export const todoAdapter = createEntityAdapter<Todo>();

// Define state shape (extends EntityState)
export interface TodoState extends EntityState<Todo> {}

// Initial state (empty todos)
export const initialState: TodoState = todoAdapter.getInitialState();

// Reducer function
export const todoReducer = createReducer(
  initialState,
  // Add a new todo
  on(TodoActions.addTodo, (state, { todo }) => todoAdapter.addOne(todo, state)),

  // Toggle todo completion
  on(TodoActions.toggleTodo, (state, { id }) =>
    todoAdapter.updateOne(
      {
        id,
        changes: { completed: !state.entities[id]?.completed },
      },
      state
    )
  ),

  // Delete a todo
  on(TodoActions.deleteTodo, (state, { id }) =>
    todoAdapter.removeOne(id, state)
  )
);
