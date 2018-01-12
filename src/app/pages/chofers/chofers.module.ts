import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './chofers.routing';
import { ChofersComponent } from './chofers.component';
import { ChofersAddModalComponent } from './components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { ChofersEditModalComponent } from './components/chofers-table/chofers-edit-modal/chofers-edit-modal.component';
import { ChofersService } from './components/chofers-table/chofers.service';
import { ChofersTableComponent } from './components/chofers-table/chofers-table.component';
import { ChofersFilterPipe } from './components/chofers-table/chofers-filter.pipe';
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
    ChofersComponent,
    ChofersTableComponent,
    ChofersFilterPipe,
    ChofersEditModalComponent
  ],
  entryComponents: [
    ChofersEditModalComponent
  ],
  providers: [
    ChofersService
  ]
})
export class ChofersModule {
}
