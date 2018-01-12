import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {Boni_has_liquisComponent } from './boni_has_liquis.component';
import {Boni_has_liquisTableComponent } from './components/boni_has_liquis-table/boni_has_liquis-table.component';
// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Boni_has_liquisComponent,
    children: [
      { path: 'boni_has_liquis-table', component: Boni_has_liquisTableComponent }
    ]
    }
  ];
export const routing: ModuleWithProviders = RouterModule.forChild(routes);
