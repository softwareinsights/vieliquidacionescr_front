import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './orden_has_refaccions.routing';
import { Orden_has_refaccionsComponent } from './orden_has_refaccions.component';
import { Orden_has_refaccionsAddModalComponent } from './components/orden_has_refaccions-table/orden_has_refaccions-add-modal/orden_has_refaccions-add-modal.component';
import { Orden_has_refaccionsEditModalComponent } from './components/orden_has_refaccions-table/orden_has_refaccions-edit-modal/orden_has_refaccions-edit-modal.component';
import { Orden_has_refaccionsService } from './components/orden_has_refaccions-table/orden_has_refaccions.service';
import { Orden_has_refaccionsTableComponent } from './components/orden_has_refaccions-table/orden_has_refaccions-table.component';
import { Orden_has_refaccionsFilterPipe } from './components/orden_has_refaccions-table/orden_has_refaccions-filter.pipe';
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
    Orden_has_refaccionsComponent,
    Orden_has_refaccionsTableComponent,
    Orden_has_refaccionsFilterPipe,
    Orden_has_refaccionsEditModalComponent
  ],
  entryComponents: [
    Orden_has_refaccionsEditModalComponent
  ],
  providers: [
    Orden_has_refaccionsService
  ]
})
export class Orden_has_refaccionsModule {
}
