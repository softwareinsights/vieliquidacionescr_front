import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {Fianza_has_foliosComponent } from './fianza_has_folios.component';
import {Fianza_has_foliosTableComponent } from './components/fianza_has_folios-table/fianza_has_folios-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Fianza_has_foliosComponent,
    children: [
      { path: 'fianza_has_folios-table', component: Fianza_has_foliosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
