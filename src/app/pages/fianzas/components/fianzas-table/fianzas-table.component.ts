import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FianzasInterface } from './fianzas.interface';
import { FianzasResponseInterface } from './fianzas-response.interface';
import { Component, OnInit } from '@angular/core';
import { FianzasService } from './fianzas.service';
import { FianzasAddModalComponent } from './fianzas-add-modal/fianzas-add-modal.component';
import { FianzasEditModalComponent } from './fianzas-edit-modal/fianzas-edit-modal.component';
@Component({
selector: 'fianzas-table',
templateUrl: './fianzas-table.html',
styleUrls: ['./fianzas-table.scss'],
})
export class FianzasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfianza';
    sortOrder = 'asc';
    constructor(
      private service: FianzasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(FianzasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(fianzas: FianzasInterface) {
      const disposable = this.dialogService.addDialog(FianzasEditModalComponent, fianzas)
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
          this.service.remove(item.idfianza)
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
            (data: FianzasResponseInterface) =>  {
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
