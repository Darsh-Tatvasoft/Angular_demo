import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';
import { Todo } from './todo.model';

export const todoAdapter = createEntityAdapter<Todo>();

export interface TodoState extends EntityState<Todo> {}

export const initialState: TodoState = todoAdapter.getInitialState();

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.addTodo, (state, { todo }) => todoAdapter.addOne(todo, state)),

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
