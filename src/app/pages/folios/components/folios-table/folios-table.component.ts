import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FoliosInterface } from './folios.interface';
import { FoliosResponseInterface } from './folios-response.interface';
import { Component, OnInit } from '@angular/core';
import { FoliosService } from './folios.service';
import { FoliosAddModalComponent } from './folios-add-modal/folios-add-modal.component';
import { FoliosEditModalComponent } from './folios-edit-modal/folios-edit-modal.component';
@Component({
selector: 'folios-table',
templateUrl: './folios-table.html',
styleUrls: ['./folios-table.scss'],
})
export class FoliosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfolio';
    sortOrder = 'asc';
    constructor(
      private service: FoliosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(FoliosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(folios: FoliosInterface) {
      const disposable = this.dialogService.addDialog(FoliosEditModalComponent, folios)
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
          this.service.remove(item.idfolio)
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
            (data: FoliosResponseInterface) =>  {
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
