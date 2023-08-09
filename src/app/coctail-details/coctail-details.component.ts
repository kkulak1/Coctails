import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoctailsService } from '../services/coctails.service';
import { CoctailDesc } from '../models/coctailDesc';

@Component({
  selector: 'app-coctail-details',
  templateUrl: './coctail-details.component.html',
  styleUrls: ['./coctail-details.component.css']
})
export class CoctailDetailsComponent implements OnInit{
  @Input('coctail') coctail: CoctailDesc | null = null

  textInput: string = ""

  constructor (private readonly route: ActivatedRoute, private readonly coctailService: CoctailsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.loadCoctail(params.get('name')!);
    });
  }

  async loadCoctail(name: string): Promise<void> {
    this.coctail = (await this.coctailService.getCoctailByName(name)).at(0)!;
  }

  async search() {
    console.log(this.textInput)
    this.coctail = (await this.coctailService.getCoctailByName(this.textInput)).at(0)!
  }

  async chooseRandomCoctail() {
    this.coctail = (await this.coctailService.getRandomCoctail()).at(0)!
    console.log(this.coctail)
  }
}
