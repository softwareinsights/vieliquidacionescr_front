import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './tallers.routing';
import { TallersComponent } from './tallers.component';
import { TallersAddModalComponent } from './components/tallers-table/tallers-add-modal/tallers-add-modal.component';
import { TallersEditModalComponent } from './components/tallers-table/tallers-edit-modal/tallers-edit-modal.component';
import { TallersService } from './components/tallers-table/tallers.service';
import { TallersTableComponent } from './components/tallers-table/tallers-table.component';
import { TallersFilterPipe } from './components/tallers-table/tallers-filter.pipe';
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
    TallersComponent,
    TallersTableComponent,
    TallersFilterPipe,
    TallersEditModalComponent
  ],
  entryComponents: [
    TallersEditModalComponent
  ],
  providers: [
    TallersService
  ]
})
export class TallersModule {
}
