import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { PermisotaxiasignadosService } from './../permisotaxiasignados.service';
import { PermisotaxiasignadosInterface } from './../permisotaxiasignados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
import { VehiculosService } from './../../../../vehiculos/components/vehiculos-table/vehiculos.service';
import { VehiculosAddModalComponent } from './../../../../vehiculos/components/vehiculos-table/vehiculos-add-modal/vehiculos-add-modal.component';
import { PermisotaxisService } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis.service';
import { PermisotaxisAddModalComponent } from './../../../../permisotaxis/components/permisotaxis-table/permisotaxis-add-modal/permisotaxis-add-modal.component';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./permisotaxiasignados-add-modal.component.scss')],
  templateUrl: './permisotaxiasignados-add-modal.component.html'
})
export class PermisotaxiasignadosAddModalComponent extends DialogComponent<PermisotaxiasignadosInterface, any> implements OnInit {
  _chofer: string[] = [];
  _vehiculo: string[] = [];
  _permisotaxi: string[] = [];

  status: string;
  fecha: string;
  chofer_idchofer: number;
  vehiculo_idvehiculo: number;
  permisotaxi_idpermisotaxi: number;
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  statusAC: AbstractControl;
  fechaAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  vehiculo_idvehiculoAC: AbstractControl;
  permisotaxi_idpermisotaxiAC: AbstractControl;
  constructor(
    private service: PermisotaxiasignadosService,
      private chofersService: ChofersService,
      private vehiculosService: VehiculosService,
      private permisotaxisService: PermisotaxisService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'statusAC' : ['',Validators.compose([Validators.maxLength(25)])],
    'fechaAC' : [''],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'vehiculo_idvehiculoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'permisotaxi_idpermisotaxiAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.statusAC = this.form.controls['statusAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.chofer_idchoferAC = this.form.controls['chofer_idchoferAC'];
    this.vehiculo_idvehiculoAC = this.form.controls['vehiculo_idvehiculoAC'];
    this.permisotaxi_idpermisotaxiAC = this.form.controls['permisotaxi_idpermisotaxiAC'];
  }
  ngOnInit() {
      this.getChofer();
      this.getVehiculo();
      this.getPermisotaxi();
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
  vehiculoAddModalShow() {
      const disposable = this.dialogService.addDialog(VehiculosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.vehiculoShowToast(data);
          }
      })
  }
  vehiculoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getVehiculo();
      } else {
          this.toastrService.error(result.message);
      }
  }
  permisotaxiAddModalShow() {
      const disposable = this.dialogService.addDialog(PermisotaxisAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.permisotaxiShowToast(data);
          }
      })
  }
  permisotaxiShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPermisotaxi();
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
  getVehiculo() {
      this.vehiculosService.all()
      .subscribe(
          (data: any) => this._vehiculo = data.result,
      );
  }
  getPermisotaxi() {
      this.permisotaxisService.all()
      .subscribe(
          (data: any) => this._permisotaxi = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: PermisotaxiasignadosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  status: this.status,
                  fecha: this.fecha,
                  chofer_idchofer: this.chofer_idchofer,
                  vehiculo_idvehiculo: this.vehiculo_idvehiculo,
                  permisotaxi_idpermisotaxi: this.permisotaxi_idpermisotaxi,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
