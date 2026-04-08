import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { SpacexApiService } from '../network/spacexapi';
import { Mission } from '../models/missionlist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-missionfilter',
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './missionfilter.html',
  styleUrl: './missionfilter.css',
})
export class Missionfilter {

  private readonly spacexService = inject(SpacexApiService)
  private readonly cdr = inject(ChangeDetectorRef)

  missions : Mission[] = [];
  filteredMissions : Mission[] = [];

  selectedYear : string = ""
  selectedLaunchSuccess : string = ""
  selectedLandSuccess : string = ""

  launchYears : string[] = []

  ngOnInit(){
    this.getMissions();
  }

  getMissions(){
    this.spacexService.getMissionsList().subscribe( {
      next : (response) => {
        this.missions = response
        this.filteredMissions = [...this.missions]
        this.launchYears = [...new Set(this.missions.map(m => m.launch_year))].sort()
        this.cdr.detectChanges();
        console.log(`${this.missions.length} missions received from API.`);
      },
      error : (error) =>{
        console.log(`Error while receiving data from API ${error}`);
      }
    })
  }

  filterByYear(year: string){
    this.selectedYear = (this.selectedYear === year) ? "" : year
    this.applyFilters()
  }

  filterByLaunchSuccess(value: string){
    this.selectedLaunchSuccess = (this.selectedLaunchSuccess === value) ? "" : value
    this.applyFilters()
  }

  filterByLandSuccess(value: string){
    this.selectedLandSuccess = (this.selectedLandSuccess === value) ? "" : value
    this.applyFilters()
  }

  applyFilters(){
    let result = [...this.missions]

    if (this.selectedYear){
      result = result.filter(m => m.launch_year === this.selectedYear)
    }

    if (this.selectedLaunchSuccess){
      const val = this.selectedLaunchSuccess === 'true'
      result = result.filter(m => m.launch_success === val)
    }

    if (this.selectedLandSuccess){
      const val = this.selectedLandSuccess === 'true'
      result = result.filter(m => {
        const rocket = m.rocket as any
        const cores = rocket?.first_stage?.cores
        if (cores && cores.length > 0) {
          return cores[0].land_success === val
        }
        return false
      })
    }

    this.filteredMissions = result
  }

  clearFilters(){
    this.selectedYear = ""
    this.selectedLaunchSuccess = ""
    this.selectedLandSuccess = ""
    this.filteredMissions = [...this.missions]
  }
}