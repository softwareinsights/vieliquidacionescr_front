import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { LiquidacionsService } from './../liquidacions.service';
import { LiquidacionsInterface } from './../liquidacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./liquidacions-edit-modal.component.scss')],
  templateUrl: './liquidacions-edit-modal.component.html'
})
export class LiquidacionsEditModalComponent extends DialogComponent<LiquidacionsInterface, any> implements OnInit, LiquidacionsInterface {
  _chofer: string[] = [];

  idliquidacion: number;
  cantidadRecibida: number;
  cambio: number;
  folio: string;
  kilometraje: number;
  fecha: string;
  nota: string;
  cantPagada: number;
  cantDeuda: number;
  status: string;
  bonificado: number;
  descripcion: string;
  chofer_idchofer: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  cantidadRecibidaAC: AbstractControl;
  cambioAC: AbstractControl;
  folioAC: AbstractControl;
  kilometrajeAC: AbstractControl;
  fechaAC: AbstractControl;
  notaAC: AbstractControl;
  cantPagadaAC: AbstractControl;
  cantDeudaAC: AbstractControl;
  statusAC: AbstractControl;
  bonificadoAC: AbstractControl;
  descripcionAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  constructor(
      private service: LiquidacionsService,
      private chofersService: ChofersService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'cantidadRecibidaAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'cambioAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'folioAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'kilometrajeAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'fechaAC' : [''],
    'notaAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'cantPagadaAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'cantDeudaAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'statusAC' : ['',Validators.compose([Validators.maxLength(25)])],
    'bonificadoAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'descripcionAC' : ['',Validators.compose([Validators.maxLength(200)])],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.cantidadRecibidaAC = this.form.controls['cantidadRecibidaAC'];
  this.cambioAC = this.form.controls['cambioAC'];
  this.folioAC = this.form.controls['folioAC'];
  this.kilometrajeAC = this.form.controls['kilometrajeAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.notaAC = this.form.controls['notaAC'];
  this.cantPagadaAC = this.form.controls['cantPagadaAC'];
  this.cantDeudaAC = this.form.controls['cantDeudaAC'];
  this.statusAC = this.form.controls['statusAC'];
  this.bonificadoAC = this.form.controls['bonificadoAC'];
  this.descripcionAC = this.form.controls['descripcionAC'];
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
  onSubmit(values: LiquidacionsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idliquidacion: this.idliquidacion,
                  cantidadRecibida: this.cantidadRecibida,
                  cambio: this.cambio,
                  folio: this.folio,
                  kilometraje: this.kilometraje,
                  fecha: this.fecha,
                  nota: this.nota,
                  cantPagada: this.cantPagada,
                  cantDeuda: this.cantDeuda,
                  status: this.status,
                  bonificado: this.bonificado,
                  descripcion: this.descripcion,
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
