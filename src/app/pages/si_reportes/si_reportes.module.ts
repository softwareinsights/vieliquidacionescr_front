import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './si_reportes.routing';
import { Si_reportesComponent } from './si_reportes.component';
import { Si_reportesAddModalComponent } from './components/si_reportes-table/si_reportes-add-modal/si_reportes-add-modal.component';
import { Si_reportesEditModalComponent } from './components/si_reportes-table/si_reportes-edit-modal/si_reportes-edit-modal.component';
import { Si_reportesService } from './components/si_reportes-table/si_reportes.service';
import { Si_reportesTableComponent } from './components/si_reportes-table/si_reportes-table.component';
import { Si_reportesFilterPipe } from './components/si_reportes-table/si_reportes-filter.pipe';
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
    Si_reportesComponent,
    Si_reportesTableComponent,
    Si_reportesFilterPipe,
    Si_reportesEditModalComponent
  ],
  entryComponents: [
    Si_reportesEditModalComponent
  ],
  providers: [
    Si_reportesService
  ]
})
export class Si_reportesModule {
}
