import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Coctail } from '../models/coctail';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';
import { CoctailsService } from './coctails.service';
import { CoctailDesc } from '../models/coctailDesc';

@Injectable({
  providedIn: 'root'
})
export class CoctailsListService {

  constructor(private readonly http: HttpClient, private readonly coctailService: CoctailsService) { }

  coctails: Promise<Coctail[]> = this.getCoctailsByCategory()

  async getCoctailsByCategory(category="Ordinary_Drink") {
    const response = await firstValueFrom(this.http.get<coctailsResponse>(`${environment.apiUrlByCategory}` + category))

    const drinks = response.drinks;

    for (const drink of drinks) {
      const coctailDesc = (await this.coctailService.getCoctailByName(drink.strDrink)).at(0)!;

      if (coctailDesc.strAlcoholic === "Alcoholic") drink.isAlcoholic = true;
      else drink.isAlcoholic = false;
    }
    console.log(drinks)
    return drinks
  }
}

export interface coctailsResponse {
  drinks: Coctail[]
}