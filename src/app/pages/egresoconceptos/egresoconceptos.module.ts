import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './egresoconceptos.routing';
import { EgresoconceptosComponent } from './egresoconceptos.component';
import { EgresoconceptosAddModalComponent } from './components/egresoconceptos-table/egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EgresoconceptosEditModalComponent } from './components/egresoconceptos-table/egresoconceptos-edit-modal/egresoconceptos-edit-modal.component';
import { EgresoconceptosService } from './components/egresoconceptos-table/egresoconceptos.service';
import { EgresoconceptosTableComponent } from './components/egresoconceptos-table/egresoconceptos-table.component';
import { EgresoconceptosFilterPipe } from './components/egresoconceptos-table/egresoconceptos-filter.pipe';
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
    EgresoconceptosComponent,
    EgresoconceptosTableComponent,
    EgresoconceptosFilterPipe,
    EgresoconceptosEditModalComponent
  ],
  entryComponents: [
    EgresoconceptosEditModalComponent
  ],
  providers: [
    EgresoconceptosService
  ]
})
export class EgresoconceptosModule {
}
