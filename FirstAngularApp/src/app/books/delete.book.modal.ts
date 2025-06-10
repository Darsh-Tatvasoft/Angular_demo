// delete-confirmation-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-modal',
  template: `
    <h2 mat-dialog-title class="text-danger">Confirm Delete</h2>
    <mat-dialog-content
      >Are you sure you want to delete this book?</mat-dialog-content
    >
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="warn" (click)="onDelete()">
        Delete
      </button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
})
export class DeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public bookId: number
  ) {}

  onDelete(): void {
    this.dialogRef.close(true); // confirmed
  }

  onCancel(): void {
    this.dialogRef.close(false); // cancelled
  }
}
