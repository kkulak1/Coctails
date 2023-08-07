import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Coctail } from '../models/coctail';
import { firstValueFrom } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoctailsListService {

  constructor(private readonly http: HttpClient) { }

  coctails: Promise<Coctail[]> = this.getCoctailsByCategory()

  async getCoctailsByCategory(category="Ordinary_Drink") {
    const response = await firstValueFrom(this.http.get<coctailsResponse>(`${environment.apiUrlByCategory}` + category))

    console.log(response)

    return response.drinks
  }
}

export interface coctailsResponse {
  drinks: Coctail[]
}
