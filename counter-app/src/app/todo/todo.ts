import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { addTodo, toggleTodo, deleteTodo } from './todo.actions';
import { TodoState, todoAdapter } from './todo.reducer';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <input #todoInput placeholder="Add a task" />
    <button (click)="addTodo(todoInput.value)">Add</button>

    <ul>
      <li *ngFor="let todo of todos$ | async">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="toggleTodo(todo.id)"
        />
        {{ todo.text }}
        <button (click)="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  `,
})
export class TodoComponent {
  todos$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: TodoState }>) {
    this.todos$ = this.store.select((state) =>
      todoAdapter.getSelectors().selectAll(state.todos)
    );
  }

  addTodo(text: string) {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    this.store.dispatch(addTodo({ todo: newTodo }));
  }

  toggleTodo(id: string) {
    this.store.dispatch(toggleTodo({ id }));
  }

  deleteTodo(id: string) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
