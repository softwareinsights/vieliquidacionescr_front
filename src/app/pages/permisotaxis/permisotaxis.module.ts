import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './permisotaxis.routing';
import { PermisotaxisComponent } from './permisotaxis.component';
import { PermisotaxisAddModalComponent } from './components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';
import { PermisotaxisEditModalComponent } from './components/permisotaxis-table/permisotaxis-edit-modal/permisotaxis-edit-modal.component';
import { PermisotaxisService } from './components/permisotaxis-table/permisotaxis.service';
import { PermisotaxisTableComponent } from './components/permisotaxis-table/permisotaxis-table.component';
import { PermisotaxisFilterPipe } from './components/permisotaxis-table/permisotaxis-filter.pipe';
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
    PermisotaxisComponent,
    PermisotaxisTableComponent,
    PermisotaxisFilterPipe,
    PermisotaxisEditModalComponent
  ],
  entryComponents: [
    PermisotaxisEditModalComponent
  ],
  providers: [
    PermisotaxisService
  ]
})
export class PermisotaxisModule {
}
