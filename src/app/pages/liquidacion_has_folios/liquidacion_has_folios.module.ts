import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './liquidacion_has_folios.routing';
import { Liquidacion_has_foliosComponent } from './liquidacion_has_folios.component';
import { Liquidacion_has_foliosAddModalComponent } from './components/liquidacion_has_folios-table/liquidacion_has_folios-add-modal/liquidacion_has_folios-add-modal.component';
import { Liquidacion_has_foliosEditModalComponent } from './components/liquidacion_has_folios-table/liquidacion_has_folios-edit-modal/liquidacion_has_folios-edit-modal.component';
import { Liquidacion_has_foliosService } from './components/liquidacion_has_folios-table/liquidacion_has_folios.service';
import { Liquidacion_has_foliosTableComponent } from './components/liquidacion_has_folios-table/liquidacion_has_folios-table.component';
import { Liquidacion_has_foliosFilterPipe } from './components/liquidacion_has_folios-table/liquidacion_has_folios-filter.pipe';
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
    Liquidacion_has_foliosComponent,
    Liquidacion_has_foliosTableComponent,
    Liquidacion_has_foliosFilterPipe,
    Liquidacion_has_foliosEditModalComponent
  ],
  entryComponents: [
    Liquidacion_has_foliosEditModalComponent
  ],
  providers: [
    Liquidacion_has_foliosService
  ]
})
export class Liquidacion_has_foliosModule {
}
