import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular2-datatable';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './boni_has_liquis.routing';
import { Boni_has_liquisComponent } from './boni_has_liquis.component';
import { Boni_has_liquisAddModalComponent } from './components/boni_has_liquis-table/boni_has_liquis-add-modal/boni_has_liquis-add-modal.component';
import { Boni_has_liquisEditModalComponent } from './components/boni_has_liquis-table/boni_has_liquis-edit-modal/boni_has_liquis-edit-modal.component';
import { Boni_has_liquisService } from './components/boni_has_liquis-table/boni_has_liquis.service';
import { Boni_has_liquisTableComponent } from './components/boni_has_liquis-table/boni_has_liquis-table.component';
import { Boni_has_liquisFilterPipe } from './components/boni_has_liquis-table/boni_has_liquis-filter.pipe';
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
    Boni_has_liquisComponent,
    Boni_has_liquisTableComponent,
    Boni_has_liquisFilterPipe,
    Boni_has_liquisEditModalComponent
  ],
  entryComponents: [
    Boni_has_liquisEditModalComponent
  ],
  providers: [
    Boni_has_liquisService
  ]
})
export class Boni_has_liquisModule {
}
