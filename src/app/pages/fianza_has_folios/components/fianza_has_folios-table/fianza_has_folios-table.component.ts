import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Fianza_has_foliosInterface } from './fianza_has_folios.interface';
import { Fianza_has_foliosResponseInterface } from './fianza_has_folios-response.interface';
import { Component, OnInit } from '@angular/core';
import { Fianza_has_foliosService } from './fianza_has_folios.service';
import { Fianza_has_foliosAddModalComponent } from './fianza_has_folios-add-modal/fianza_has_folios-add-modal.component';
import { Fianza_has_foliosEditModalComponent } from './fianza_has_folios-edit-modal/fianza_has_folios-edit-modal.component';
@Component({
selector: 'fianza_has_folios-table',
templateUrl: './fianza_has_folios-table.html',
styleUrls: ['./fianza_has_folios-table.scss'],
})
export class Fianza_has_foliosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idfianza_has_folio';
    sortOrder = 'asc';
    constructor(
      private service: Fianza_has_foliosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Fianza_has_foliosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(fianza_has_folios: Fianza_has_foliosInterface) {
      const disposable = this.dialogService.addDialog(Fianza_has_foliosEditModalComponent, fianza_has_folios)
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
          this.service.remove(item.idfianza_has_folio)
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
            (data: Fianza_has_foliosResponseInterface) =>  {
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
