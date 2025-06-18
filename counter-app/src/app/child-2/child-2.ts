import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-child-2',
  imports: [],
  templateUrl: './child-2.html',
  styleUrl: './child-2.css',
})
export class Child2 implements OnInit, OnDestroy {
  @Input() message!: string;

  subscription!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.subscription = this.dataService.message$.subscribe(
      (message) => (this.message = message)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
