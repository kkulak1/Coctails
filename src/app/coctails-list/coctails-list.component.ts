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
  coctailsPerPage = 8
  currentPage = 1
  selectedOption = "Ordinary_Drink";

  async ngOnInit(): Promise<void> {
    this.coctails = await this.coctailListService.coctails
  }

  get paginatedCoctails() {
    const startIndex = (this.currentPage - 1) * this.coctailsPerPage
    return this.coctails.slice(startIndex, startIndex + this.coctailsPerPage)
  }
  
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

  async submitFilter() {
    console.log(this.selectedOption);
    this.coctails = await this.coctailListService.getCoctailsByCategory(this.selectedOption)
  }
}
