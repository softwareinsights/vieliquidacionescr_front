import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './corralons.routing';
import { CorralonsComponent } from './corralons.component';
import { CorralonsAddModalComponent } from './components/corralons-table/corralons-add-modal/corralons-add-modal.component';
import { CorralonsEditModalComponent } from './components/corralons-table/corralons-edit-modal/corralons-edit-modal.component';
import { CorralonsService } from './components/corralons-table/corralons.service';
import { CorralonsTableComponent } from './components/corralons-table/corralons-table.component';
import { CorralonsFilterPipe } from './components/corralons-table/corralons-filter.pipe';
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
    CorralonsComponent,
    CorralonsTableComponent,
    CorralonsFilterPipe,
    CorralonsEditModalComponent
  ],
  entryComponents: [
    CorralonsEditModalComponent
  ],
  providers: [
    CorralonsService
  ]
})
export class CorralonsModule {
}
