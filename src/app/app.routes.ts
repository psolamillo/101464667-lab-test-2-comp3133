import { Routes } from '@angular/router';
import { Missionlist } from './missionlist/missionlist';
import { Missionfilter } from './missionfilter/missionfilter';
import { Missiondetails } from './missiondetails/missiondetails';

export const routes: Routes = [

{path: '', redirectTo: 'missionlist', pathMatch: 'full'},
  {path: 'missionlist', title: 'Mission List', component: Missionlist},
  {path: 'missionfilter', title: 'Mission Filter', component: Missionfilter},
  {path: 'missiondetails/:id', title: 'Mission Details', component: Missiondetails},
  {path: '**', redirectTo: 'missionlist'}
];