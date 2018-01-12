import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './fianza_has_folios.routing';
import { Fianza_has_foliosComponent } from './fianza_has_folios.component';
import { Fianza_has_foliosAddModalComponent } from './components/fianza_has_folios-table/fianza_has_folios-add-modal/fianza_has_folios-add-modal.component';
import { Fianza_has_foliosEditModalComponent } from './components/fianza_has_folios-table/fianza_has_folios-edit-modal/fianza_has_folios-edit-modal.component';
import { Fianza_has_foliosService } from './components/fianza_has_folios-table/fianza_has_folios.service';
import { Fianza_has_foliosTableComponent } from './components/fianza_has_folios-table/fianza_has_folios-table.component';
import { Fianza_has_foliosFilterPipe } from './components/fianza_has_folios-table/fianza_has_folios-filter.pipe';
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
    Fianza_has_foliosComponent,
    Fianza_has_foliosTableComponent,
    Fianza_has_foliosFilterPipe,
    Fianza_has_foliosEditModalComponent
  ],
  entryComponents: [
    Fianza_has_foliosEditModalComponent
  ],
  providers: [
    Fianza_has_foliosService
  ]
})
export class Fianza_has_foliosModule {
}
