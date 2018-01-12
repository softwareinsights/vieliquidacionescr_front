import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {Liquidacion_has_foliosComponent } from './liquidacion_has_folios.component';
import {Liquidacion_has_foliosTableComponent } from './components/liquidacion_has_folios-table/liquidacion_has_folios-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Liquidacion_has_foliosComponent,
    children: [
      { path: 'liquidacion_has_folios-table', component: Liquidacion_has_foliosTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
