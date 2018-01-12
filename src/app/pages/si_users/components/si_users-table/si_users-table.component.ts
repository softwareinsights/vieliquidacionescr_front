import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_usersInterface } from './si_users.interface';
import { Si_usersResponseInterface } from './si_users-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_usersService } from './si_users.service';
import { Si_usersAddModalComponent } from './si_users-add-modal/si_users-add-modal.component';
import { Si_usersEditModalComponent } from './si_users-edit-modal/si_users-edit-modal.component';
@Component({
selector: 'si_users-table',
templateUrl: './si_users-table.html',
styleUrls: ['./si_users-table.scss'],
})
export class Si_usersTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_user';
    sortOrder = 'asc';
    constructor(
      private service: Si_usersService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService) {
    }
    ngOnInit() {
        this.getAll();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Si_usersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      })
    }
    editModalShow(si_users: Si_usersInterface) {
      const disposable = this.dialogService.addDialog(Si_usersEditModalComponent, si_users)
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
          this.service.remove(item.idsi_user)
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
            (data: Si_usersResponseInterface) =>  {
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
