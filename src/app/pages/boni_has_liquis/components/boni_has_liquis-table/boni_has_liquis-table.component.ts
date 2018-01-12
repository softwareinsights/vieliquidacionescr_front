import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Boni_has_liquisInterface } from './boni_has_liquis.interface';
import { Boni_has_liquisResponseInterface } from './boni_has_liquis-response.interface';
import { Component, OnInit } from '@angular/core';
import { Boni_has_liquisService } from './boni_has_liquis.service';
import { Boni_has_liquisAddModalComponent } from './boni_has_liquis-add-modal/boni_has_liquis-add-modal.component';
import { Boni_has_liquisEditModalComponent } from './boni_has_liquis-edit-modal/boni_has_liquis-edit-modal.component';
@Component({
selector: 'boni_has_liquis-table',
templateUrl: './boni_has_liquis-table.html',
styleUrls: ['./boni_has_liquis-table.scss'],
})
export class Boni_has_liquisTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idboni_has_liqui';
    sortOrder = 'asc';
    constructor(
      private service: Boni_has_liquisService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Boni_has_liquisAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(boni_has_liquis: Boni_has_liquisInterface) {
      const disposable = this.dialogService.addDialog(Boni_has_liquisEditModalComponent, boni_has_liquis)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idboni_has_liqui)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: Boni_has_liquisResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
