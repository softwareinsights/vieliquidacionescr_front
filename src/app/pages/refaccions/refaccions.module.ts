import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './refaccions.routing';
import { RefaccionsComponent } from './refaccions.component';
import { RefaccionsAddModalComponent } from './components/refaccions-table/refaccions-add-modal/refaccions-add-modal.component';
import { RefaccionsEditModalComponent } from './components/refaccions-table/refaccions-edit-modal/refaccions-edit-modal.component';
import { RefaccionsService } from './components/refaccions-table/refaccions.service';
import { RefaccionsTableComponent } from './components/refaccions-table/refaccions-table.component';
import { RefaccionsFilterPipe } from './components/refaccions-table/refaccions-filter.pipe';
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
    RefaccionsComponent,
    RefaccionsTableComponent,
    RefaccionsFilterPipe,
    RefaccionsEditModalComponent
  ],
  entryComponents: [
    RefaccionsEditModalComponent
  ],
  providers: [
    RefaccionsService
  ]
})
export class RefaccionsModule {
}
