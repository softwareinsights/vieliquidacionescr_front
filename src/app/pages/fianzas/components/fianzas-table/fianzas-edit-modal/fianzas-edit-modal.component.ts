import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FianzasService } from './../fianzas.service';
import { FianzasInterface } from './../fianzas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./fianzas-edit-modal.component.scss')],
  templateUrl: './fianzas-edit-modal.component.html'
})
export class FianzasEditModalComponent extends DialogComponent<FianzasInterface, any> implements OnInit, FianzasInterface {
  _chofer: string[] = [];

  idfianza: number;
  montopagado: string;
  montoadeudado: string;
  status: string;
  chofer_idchofer: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  montopagadoAC: AbstractControl;
  montoadeudadoAC: AbstractControl;
  statusAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  constructor(
      private service: FianzasService,
      private chofersService: ChofersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'montopagadoAC' : [''],
    'montoadeudadoAC' : [''],
    'statusAC' : ['',Validators.compose([Validators.maxLength(25)])],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.montopagadoAC = this.form.controls['montopagadoAC'];
  this.montoadeudadoAC = this.form.controls['montoadeudadoAC'];
  this.statusAC = this.form.controls['statusAC'];
  this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
  }
  ngOnInit() {
      this.getChofer();
  }

  choferAddModalShow() {
      const disposable = this.dialogService.addDialog(ChofersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.choferShowToast(data);
          }
      })
  }

  choferShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getChofer();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getChofer() {
      this.chofersService.all()
      .subscribe(
          (data: any) => this._chofer = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: FianzasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idfianza: this.idfianza,
                  montopagado: this.montopagado,
                  montoadeudado: this.montoadeudado,
                  status: this.status,
                  chofer_idchofer: this.chofer_idchofer,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
