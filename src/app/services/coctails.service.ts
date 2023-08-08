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

    console.log(response)

    return response.drinks
  }
}

export interface coctailsResponse {
  drinks: CoctailDesc[]
}
