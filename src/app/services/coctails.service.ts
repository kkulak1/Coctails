import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoctailsService {

  constructor(private readonly http: HttpClient) { }

  async getCoctailById(id="") {
    const response = await firstValueFrom(this.http.get<coctailResponse>(`${environment.apiUrlCoctailById}` + id))

    console.log(response)

    return response
  }
}

export interface coctailResponse {
  idDrink: string,
  strDrink: string,
  strCategory: string,
  strAlcoholic: string,
  strInstructions: string
  strImageSource: string
}