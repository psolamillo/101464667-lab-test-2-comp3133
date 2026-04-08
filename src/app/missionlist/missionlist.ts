import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { SpacexApiService } from '../network/spacexapi';
import { Mission } from '../models/missionlist';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-missionlist',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule],
  templateUrl: './missionlist.html',
  styleUrl: './missionlist.css',
})
export class Missionlist {

  private readonly spacexService = inject(SpacexApiService)
  private readonly cdr = inject(ChangeDetectorRef)

  missions : Mission[] = [];

  ngOnInit(){
    this.getMissions();
  }

  getMissions(){
    this.spacexService.getMissionsList().subscribe( {
      next : (response) => {
        this.missions = response
        this.cdr.detectChanges();
        console.log(`${this.missions.length} missions from API.`);
      },
      error : (error) =>{
        console.log(`Error while receiving data from API ${error}`);
      }
    })
  }
}