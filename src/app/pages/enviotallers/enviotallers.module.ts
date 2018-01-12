import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './enviotallers.routing';
import { EnviotallersComponent } from './enviotallers.component';
import { EnviotallersAddModalComponent } from './components/enviotallers-table/enviotallers-add-modal/enviotallers-add-modal.component';
import { EnviotallersEditModalComponent } from './components/enviotallers-table/enviotallers-edit-modal/enviotallers-edit-modal.component';
import { EnviotallersService } from './components/enviotallers-table/enviotallers.service';
import { EnviotallersTableComponent } from './components/enviotallers-table/enviotallers-table.component';
import { EnviotallersFilterPipe } from './components/enviotallers-table/enviotallers-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    AppTranslationModule,
    ReactiveFormsModule,
    NgaModule,
    NgbRatingModule,
    routing,
    DataTableModule,
    NgbModalModule,
    BootstrapModalModule.forRoot({ container: document.body })
  ],
  declarations: [
    EnviotallersComponent,
    EnviotallersTableComponent,
    EnviotallersFilterPipe,
    EnviotallersEditModalComponent
  ],
  entryComponents: [
    EnviotallersEditModalComponent
  ],
  providers: [
    EnviotallersService
  ]
})
export class EnviotallersModule {
}
