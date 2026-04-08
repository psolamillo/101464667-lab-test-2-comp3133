import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/missionlist';

@Injectable({
  providedIn: 'root',
})
export class SpacexApiService {

  private readonly httpClient = inject(HttpClient)

  private API_BASE_URL = "https://api.spacexdata.com/v3/launches"

  public getMissionsList(): Observable<Mission[]>{
    return this.httpClient.get<Mission[]>(this.API_BASE_URL)
  }

  public getMissionByFlightNumber(flightNumber: number): Observable<Mission>{
    return this.httpClient.get<Mission>(`${this.API_BASE_URL}/${flightNumber}`)
  }

  public getMissionsByYear(launchYear: string): Observable<Mission[]>{
    return this.httpClient.get<Mission[]>(`${this.API_BASE_URL}?launch_year=${launchYear}`)
  }
}