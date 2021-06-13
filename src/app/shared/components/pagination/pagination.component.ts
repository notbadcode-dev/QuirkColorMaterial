import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PalettePaginate } from 'src/app/shared/models/palette.model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() set _pagination(value: PalettePaginate) {
    this.pagination = value;
    this.pagination.pagesNumber = this.generatePagesNumber(this.pagination.totalPages);
  }

  @Output() _changePage = new EventEmitter<number>();

  pagination!: PalettePaginate;

  constructor() { }

  ngOnInit(): void {
  }

  generatePagesNumber(maxNumber: number): number[] {
    const numbers: number[] = [];
    for (let index = 0; index < maxNumber; index++) {
      numbers.push(index + 1)
    }
    return numbers;
  }

  showPage(pageNumber: number): boolean {
    if (pageNumber === this.pagination.currentPage) {
      return true;
    }

    if (pageNumber === this.pagination.currentPage - 1) {
      return true;
    }

    if (pageNumber === this.pagination.currentPage + 1) {
      return true;
    }

    if (pageNumber === this.pagination.currentPage - 2) {
      return true;
    }

    if (pageNumber === this.pagination.currentPage + 2) {
      return true;
    }

    if (this.pagination.currentPage  === 1 && pageNumber === this.pagination.currentPage + 3) {
      return true;
    }

    if (this.pagination.currentPage  === this.pagination.totalPages && pageNumber === this.pagination.currentPage - 3) {
      return true;
    }

    return false;
  }

  showPagenumber(pageNumber: number): string {

    if (pageNumber === 0
      || pageNumber === this.pagination.currentPage - 2
      || pageNumber === this.pagination.currentPage + 2
      || pageNumber === this.pagination.currentPage + 3
      || pageNumber === this.pagination.currentPage - 3
      || pageNumber === this.pagination.totalPages + 1) {
      return '...';
    }

    if (this.pagination.currentPage === 1 && pageNumber === this.pagination.currentPage + 2) {
      return pageNumber + ''; 
    }

    if (this.pagination.currentPage === this.pagination.totalPages && pageNumber === this.pagination.currentPage - 2) {
      return pageNumber + ''; 
    }

    return pageNumber + '';
  }

  disabledPageButton(pageNumber: number) {
    return pageNumber === 0 || pageNumber === this.pagination.totalPages + 1
  }

  changePage(pageNumber: number) {
    this._changePage.emit(pageNumber);
  }

}
