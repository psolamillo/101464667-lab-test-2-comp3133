import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SpacexApiService } from '../network/spacexapi';
import { Mission } from '../models/missionlist';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-missiondetails',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './missiondetails.html',
  styleUrl: './missiondetails.css'
})
export class Missiondetails {

  private readonly spacexService = inject(SpacexApiService)
  private readonly route = inject(ActivatedRoute)
  private readonly cdr = inject(ChangeDetectorRef)

  mission : Mission | null = null;

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('Route param id:', id);
      if (id) {
        this.getMissionDetails(Number(id));
      }
    });
  }

  getMissionDetails(flightNumber: number){
    console.log(`Fetching mission details for flight #${flightNumber}`);
    this.spacexService.getMissionByFlightNumber(flightNumber).subscribe( {
      next : (response) => {
        this.mission = response
        this.cdr.detectChanges();
        console.log(`Recieved mission dtails for flight #${flightNumber}`, response);
      },
      error : (error) =>{
        this.spacexService.getMissionsList().subscribe({
          next : (missions) => {
            this.mission = missions.find(m => m.flight_number === flightNumber) || null;
            this.cdr.detectChanges();
            console.log('Found mission from list:', this.mission?.mission_name);
          },
          error : (err) => {
            console.log(`Error while receiving mission details ${err}`);
          }
        });
      }
    })
  }
}