import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h3>Child Component</h3>
    <p>Message from Parent: {{ messageFromParent }}</p>
    <p>Child's own message: Hello from Child!</p>
    <p>Click the button to send a message back to Parent.</p>
    <button (click)="sendMessageToParent()">Send Message to Parent</button>
  `,
})
export class Child {
  @Input() messageFromParent!: string;

  @Output() messageEvent = new EventEmitter<string>();

  sendMessageToParent() {
    this.messageEvent.emit('Hello from Child!');
  }
}
