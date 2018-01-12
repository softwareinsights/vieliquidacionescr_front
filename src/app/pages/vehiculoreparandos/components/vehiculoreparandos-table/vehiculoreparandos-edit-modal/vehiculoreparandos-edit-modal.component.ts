import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculoreparandosService } from './../vehiculoreparandos.service';
import { VehiculoreparandosInterface } from './../vehiculoreparandos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnviotallersService } from './../../../../enviotallers/components/enviotallers-table/enviotallers.service';
import { EnviotallersAddModalComponent } from './../../../../enviotallers/components/enviotallers-table/enviotallers-add-modal/enviotallers-add-modal.component';
import { TallersService } from './../../../../tallers/components/tallers-table/tallers.service';
import { TallersAddModalComponent } from './../../../../tallers/components/tallers-table/tallers-add-modal/tallers-add-modal.component';
import { MecanicosService } from './../../../../mecanicos/components/mecanicos-table/mecanicos.service';
import { MecanicosAddModalComponent } from './../../../../mecanicos/components/mecanicos-table/mecanicos-add-modal/mecanicos-add-modal.component';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./vehiculoreparandos-edit-modal.component.scss')],
  templateUrl: './vehiculoreparandos-edit-modal.component.html'
})
export class VehiculoreparandosEditModalComponent extends DialogComponent<VehiculoreparandosInterface, any> implements OnInit, VehiculoreparandosInterface {
  _enviotaller: string[] = [];
  _taller: string[] = [];
  _mecanico: string[] = [];
  _permisotaxiasignado: string[] = [];

  idvehiculoreparando: number;
  fechaIngresa: string;
  fechaSalida: string;
  fechaEstimada: string;
  inventario: string;
  motivo: string;
  status: string;
  orden: string;
  enviotaller_idenviotaller: number;
  taller_idtaller: number;
  mecanico_idmecanico: number;
  permisotaxiasignado_idpermisotaxiasignado: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  fechaIngresaAC: AbstractControl;
  fechaSalidaAC: AbstractControl;
  fechaEstimadaAC: AbstractControl;
  inventarioAC: AbstractControl;
  motivoAC: AbstractControl;
  statusAC: AbstractControl;
  ordenAC: AbstractControl;
  enviotaller_idenviotallerAC: AbstractControl;
  taller_idtallerAC: AbstractControl;
  mecanico_idmecanicoAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;
  constructor(
      private service: VehiculoreparandosService,
      private enviotallersService: EnviotallersService,
      private tallersService: TallersService,
      private mecanicosService: MecanicosService,
      private permisotaxiasignadosService: PermisotaxiasignadosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'fechaIngresaAC' : [''],
    'fechaSalidaAC' : [''],
    'fechaEstimadaAC' : [''],
    'inventarioAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'motivoAC' : ['',Validators.compose([Validators.maxLength(80)])],
    'statusAC' : ['',Validators.compose([Validators.maxLength(25)])],
    'ordenAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'enviotaller_idenviotallerAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'taller_idtallerAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'mecanico_idmecanicoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'permisotaxiasignado_idpermisotaxiasignadoAC' : ['',Validators.compose([Validators.maxLength(11)])],
  });
  this.fechaIngresaAC = this.form.controls['fechaIngresaAC'];
  this.fechaSalidaAC = this.form.controls['fechaSalidaAC'];
  this.fechaEstimadaAC = this.form.controls['fechaEstimadaAC'];
  this.inventarioAC = this.form.controls['inventarioAC'];
  this.motivoAC = this.form.controls['motivoAC'];
  this.statusAC = this.form.controls['statusAC'];
  this.ordenAC = this.form.controls['ordenAC'];
  this.enviotaller_idenviotallerAC = this.form.controls['enviotaller_idenviotallerAC'];
  this.taller_idtallerAC = this.form.controls['taller_idtallerAC'];
  this.mecanico_idmecanicoAC = this.form.controls['mecanico_idmecanicoAC'];
  this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
  }
  ngOnInit() {
      this.getEnviotaller();
      this.getTaller();
      this.getMecanico();
      this.getPermisotaxiasignado();
  }

  enviotallerAddModalShow() {
      const disposable = this.dialogService.addDialog(EnviotallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.enviotallerShowToast(data);
          }
      })
  }

  enviotallerShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEnviotaller();
      } else {
          this.toastrService.error(result.message);
      }
  }
  tallerAddModalShow() {
      const disposable = this.dialogService.addDialog(TallersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tallerShowToast(data);
          }
      })
  }

  tallerShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTaller();
      } else {
          this.toastrService.error(result.message);
      }
  }
  mecanicoAddModalShow() {
      const disposable = this.dialogService.addDialog(MecanicosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.mecanicoShowToast(data);
          }
      })
  }

  mecanicoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getMecanico();
      } else {
          this.toastrService.error(result.message);
      }
  }
  permisotaxiasignadoAddModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxiasignadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.permisotaxiasignadoShowToast(data);
          }
      })
  }

  permisotaxiasignadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPermisotaxiasignado();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getEnviotaller() {
      this.enviotallersService.all()
      .subscribe(
          (data: any) => this._enviotaller = data.result,
      );
  }
  getTaller() {
      this.tallersService.all()
      .subscribe(
          (data: any) => this._taller = data.result,
      );
  }
  getMecanico() {
      this.mecanicosService.all()
      .subscribe(
          (data: any) => this._mecanico = data.result,
      );
  }
  getPermisotaxiasignado() {
      this.permisotaxiasignadosService.all()
      .subscribe(
          (data: any) => this._permisotaxiasignado = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: VehiculoreparandosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idvehiculoreparando: this.idvehiculoreparando,
                  fechaIngresa: this.fechaIngresa,
                  fechaSalida: this.fechaSalida,
                  fechaEstimada: this.fechaEstimada,
                  inventario: this.inventario,
                  motivo: this.motivo,
                  status: this.status,
                  orden: this.orden,
                  enviotaller_idenviotaller: this.enviotaller_idenviotaller,
                  taller_idtaller: this.taller_idtaller,
                  mecanico_idmecanico: this.mecanico_idmecanico,
                  permisotaxiasignado_idpermisotaxiasignado: this.permisotaxiasignado_idpermisotaxiasignado,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
