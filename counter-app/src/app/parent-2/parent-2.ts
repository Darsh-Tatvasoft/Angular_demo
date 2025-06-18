import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SharedService } from './shared.service';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-parent-2',
  imports: [AsyncPipe],
  templateUrl: './parent-2.html',
  styleUrl: './parent-2.css',
})
export class Parent2 implements OnInit, OnDestroy {
  receivedMessage!: string;
  subscription!: Subscription;
  message$: Observable<string>;

  constructor(
    private sharedService: SharedService,
    private store: Store<{ message: string }>
  ) {
    this.message$ = store.select('message');
  }

  ngOnInit() {
    this.subscription = this.sharedService.currentData.subscribe(
      (message) => (this.receivedMessage = message)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
