import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

interface ColumnConfig {
  field: string;
  header: string;
  sortable?: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  imports: [CommonModule],
})
export class TableComponent {
  @Input() columns: ColumnConfig[] = [];
  @Input() data: any[] = [];
  @Input() pageSize: number = 5;
  @Input() enablePagination: boolean = true;

  @Output() rowClicked = new EventEmitter<any>();

  currentPage: number = 1;
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get paginatedData() {
    let sortedData = [...this.data];

    if (this.sortField) {
      sortedData.sort((a, b) => {
        const valueA = a[this.sortField];
        const valueB = b[this.sortField];
        if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    if (!this.enablePagination) {
      return sortedData;
    }

    const start = (this.currentPage - 1) * this.pageSize;
    return sortedData.slice(start, start + this.pageSize);
  }

  totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }

  changePage(delta: number) {
    const newPage = this.currentPage + delta;
    if (newPage >= 1 && newPage <= this.totalPages()) {
      this.currentPage = newPage;
    }
  }

  sort(column: ColumnConfig) {
    if (!column.sortable) return;
    if (this.sortField === column.field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = column.field;
      this.sortDirection = 'asc';
    }
  }

  onRowClick(row: any) {
    this.rowClicked.emit(row);
  }
}
