import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../child-2/data.service';
@Component({
  selector: 'app-child',
  imports: [FormsModule],
  templateUrl: `child.html`,
  styleUrls: ['./child.css'],
})
export class Child {
  constructor(private dataService: DataService) {}

  @Input() messageFromParent!: string;

  @Output() messageEvent = new EventEmitter<string>();
  message!: string;
  // message: string = 'Hello from Child 1!';

  sendMessageToParent() {
    this.messageEvent.emit('Hello from Child!');
  }

  internalData = 'Secret child data';

  getData() {
    return this.internalData;
  }

  // for child-child
  sendMessage() {
    this.messageEvent.emit(this.message);
  }

  sendServiceMessage() {
    this.dataService.sendMessage(this.message);
  }
}
