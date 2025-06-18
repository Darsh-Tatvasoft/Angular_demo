import {
  AfterViewInit,
  Component,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { Child } from '../child/child'; // Child component used in multiple methods
import { Child2 } from '../child-2/child-2'; // Sibling component for child-to-child via parent
import { SharedService } from '../parent-2/shared.service';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { sendMessage } from '../parent-2/message.actions';

@Component({
  selector: 'app-parent',
  templateUrl: `parent.html`,
  imports: [Child, Child2, FormsModule], // Required when using standalone components
})
export class Parent {
  // export class Parent implements AfterViewInit {
  // For Input Binding to Child
  parentMessage = 'Hello from Parent!';

  // Used as intermediate message when mediating between child components
  message!: string;

  // For receiving messages from Child via Output or ViewChild
  childMessage!: string;

  // For sending data to child via ViewChild
  messageFromParent = 'Initialized from Parent';

  // Used to hold internal child data received via ViewChild
  childData: any;

  // Child to Parent Communication: Output binding
  receiveMessage(message: string) {
    this.childMessage = message;
  }

  // ViewChild reference to the first <app-child> element
  // Used for Parent-to-Child (setting message) and Child-to-Parent (retrieving internal data)
  @ViewChild(Child, { static: false }) child!: Child;

  constructor(
    private cdr: ChangeDetectorRef,
    private sharedService: SharedService,
    private store: Store
  ) {}

  // Parent to Child via ViewChild (sets a value on the child component instance)
  // ngAfterViewInit() {
  //   // Assign message to child component after view is initialized
  //   this.child.message = this.messageFromParent;
  //   // Forces Angular to detect changes after ViewChild assignment
  //   this.cdr.detectChanges();
  // }

  // Toggle the child component message via ViewChild
  updateChild() {
    this.child.message =
      this.child.message === this.messageFromParent
        ? 'Updated from Parent'
        : this.messageFromParent;
  }

  // Child to Parent via ViewChild: get internal data from child
  getChildData() {
    this.childData = this.child.getData();
  }

  // parent to parent communication via shared service
  sendMessage() {
    this.sharedService.changeData(this.message);
  }

  send() {
    this.store.dispatch(sendMessage({ message: this.message }));
  }
}
