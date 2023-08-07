import { Component, OnInit } from '@angular/core';
import { Coctail } from '../models/coctail';
import { CoctailsListService } from '../services/coctails-list.service';

@Component({
  selector: 'app-coctails-list',
  templateUrl: './coctails-list.component.html',
  styleUrls: ['./coctails-list.component.css']
})
export class CoctailsListComponent implements OnInit{
  constructor(private readonly coctailListService: CoctailsListService) {}

  coctails: Coctail[] = []
  coctailsPerPage = 10
  currentPage = 1

  async ngOnInit(): Promise<void> {
    this.coctails = await this.coctailListService.coctails
  }

  get paginatedCoctails() {
    const startIndex = (this.currentPage - 1) * this.coctailsPerPage
    return this.coctails.slice(startIndex, startIndex + this.coctailsPerPage)
  }

  // getPaginationArray(): number[] {
  //   const totalPages = Math.ceil(this.coctails.length / this.coctailsPerPage);
  //   return new Array(totalPages).fill(0).map((_, index) => index + 1);
  // }

  getVisiblePaginationArray(): number[] {
    const totalPages = Math.ceil(this.coctails.length / this.coctailsPerPage);
    const maxVisiblePages = 5;
    const currentPageIndex = this.currentPage - 1;
    const middlePageIndex = Math.floor(maxVisiblePages / 2);

    let startIndex = 0;
    if (currentPageIndex >= middlePageIndex && currentPageIndex + middlePageIndex < totalPages) {
      startIndex = currentPageIndex - middlePageIndex;
    } else if (currentPageIndex + middlePageIndex >= totalPages) {
      startIndex = totalPages - maxVisiblePages;
    }

    return new Array(maxVisiblePages).fill(0).map((_, index) => startIndex + index + 1);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }
}
