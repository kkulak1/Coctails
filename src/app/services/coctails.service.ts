import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';
import { CoctailDesc} from '../models/coctailDesc';

@Injectable({
  providedIn: 'root'
})
export class CoctailsService {
  constructor(private readonly http: HttpClient) { }

  coctail: Promise<CoctailDesc[]> = this.getCoctailByName()

  async getCoctailByName(name="margarita") {
    const response = await firstValueFrom(this.http.get<coctailsResponse>(`${environment.apiUrlCoctailByName}` + name))

    const coctails: CoctailDesc[] = [];

    if (response.drinks) {
      response.drinks.forEach(drink => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientKey = `strIngredient${i}` as keyof typeof drink;
          const ingredient = drink[ingredientKey];
          if (ingredient) {
            ingredients.push(ingredient.toString());
          }
        }

        coctails.push({
          idDrink: drink.idDrink,
          strDrink: drink.strDrink,
          strCategory: drink.strCategory,
          strAlcoholic: drink.strAlcoholic,
          strInstructions: drink.strInstructions,
          strDrinkThumb: drink.strDrinkThumb,
          ingredients: ingredients
        });
      });
    }

    return coctails;
  }

  async getRandomCoctail() {
    const response = await firstValueFrom(this.http.get<coctailsResponse>(`${environment.apiUrlRandomCoctail}`))
    console.log(response.drinks)
    return response.drinks
  }

  async getCoctailById(id: string) {
    const response = await firstValueFrom(this.http.get<coctailsResponse>(`${environment.apiUrlCoctailById}` + id))
    
    const coctails: CoctailDesc[] = [];


    if (response.drinks) {
      response.drinks.forEach(drink => {
        const ingredients: string[] = [];
        for (let i = 1; i <= 15; i++) {
          const ingredientKey = `strIngredient${i}` as keyof typeof drink;
          const ingredient = drink[ingredientKey];
          if (ingredient) {
            ingredients.push(ingredient.toString());
          }
        }

        coctails.push({
          idDrink: drink.idDrink,
          strDrink: drink.strDrink,
          strCategory: drink.strCategory,
          strAlcoholic: drink.strAlcoholic,
          strInstructions: drink.strInstructions,
          strDrinkThumb: drink.strDrinkThumb,
          ingredients: ingredients
        });
      });
    }

    return coctails;
  }
}

export interface coctailsResponse {
  drinks: CoctailDesc[]
}
