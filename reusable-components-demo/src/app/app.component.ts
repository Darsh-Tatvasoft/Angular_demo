import { Component } from '@angular/core';
import { ButtonComponent } from './shared/components/button/button.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { TableComponent } from './shared/components/table/table.component';

@Component({
  selector: 'app-root',
  imports: [ButtonComponent, ModalComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'reusable-components-demo';

  // Fix: add missing variables
  isSaving = false;
  modalOpen = false;

  saveData() {
    this.isSaving = true;
    setTimeout(() => {
      console.log('Data saved!');
      this.isSaving = false;
    }, 1500);
  }

  columns = [
    { field: 'id', header: 'ID', sortable: true },
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
  ];

  data = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'David', email: 'david@example.com' },
    { id: 5, name: 'Eva', email: 'eva@example.com' },
    { id: 6, name: 'Frank', email: 'frank@example.com' },
  ];

  handleRowClick(row: any) {
    console.log('Row clicked:', row);
  }
}

