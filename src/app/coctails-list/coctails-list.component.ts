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
  coctailsAlcoholic: Coctail[] = []
  coctailsNonAlcoholic: Coctail[] = []
  coctailsPerPage = 8
  currentPage = 1
  selectedOption = "Ordinary_Drink";
  showAlcoholic: boolean = true

  async ngOnInit(): Promise<void> {
    console.log("hello, ngOnInit");
    (await this.coctailListService.coctails).forEach(coctail => {
      console.log(coctail.isAlcoholic)
      if (coctail.isAlcoholic) this.coctailsAlcoholic.push(coctail)
      else this.coctailsNonAlcoholic.push(coctail)
    })
    this.coctails = this.coctailsAlcoholic.concat(this.coctailsNonAlcoholic)
  }

  get paginatedCoctails() {
    const startIndex = (this.currentPage - 1) * this.coctailsPerPage
    return this.coctails.slice(startIndex, startIndex + this.coctailsPerPage)
  }
  
  getVisiblePaginationArray(): number[] {
    const totalPages = this.coctails.length > 0 ? Math.ceil(this.coctails.length / this.coctailsPerPage) : 1;
    const maxVisiblePages = 5;
    const currentPageIndex = this.currentPage - 1;
    const middlePageIndex = Math.floor(maxVisiblePages / 2);
  
    let startIndex = 0;
    if (currentPageIndex >= middlePageIndex && currentPageIndex + middlePageIndex < totalPages) {
      startIndex = currentPageIndex - middlePageIndex;
    } else if (currentPageIndex + middlePageIndex >= totalPages) {
      startIndex = totalPages - maxVisiblePages;
    }
  
    const visiblePages = [];
    for (let i = startIndex; i < totalPages && visiblePages.length < maxVisiblePages; i++) {
      if (i >= 0) {
        visiblePages.push(i + 1);
      }
    }
  
    return visiblePages;
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  async submitFilter() {
    this.coctailsAlcoholic.splice(0, this.coctailsAlcoholic.length);
    this.coctailsNonAlcoholic.splice(0, this.coctailsNonAlcoholic.length);
    const result: Coctail[] = await this.coctailListService.getCoctailsByCategory(this.selectedOption);
    
    (result).forEach((coctail: Coctail) => {
      if (coctail.isAlcoholic === true) this.coctailsAlcoholic.push(coctail)
      else this.coctailsNonAlcoholic.push(coctail)
    })

    this.coctails = this.coctailsAlcoholic.concat(this.coctailsNonAlcoholic)
  }

  toggleShowAlcoholic() {
    if (this.showAlcoholic === true) {
      this.showAlcoholic = false
      this.coctails = this.coctailsNonAlcoholic
    }
    else {
      this.showAlcoholic = true
      this.coctails = this.coctailsAlcoholic.concat(this.coctailsNonAlcoholic)
    }
      
  }
}
