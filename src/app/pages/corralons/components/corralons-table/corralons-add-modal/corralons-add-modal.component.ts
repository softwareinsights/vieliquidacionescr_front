import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CorralonsService } from './../corralons.service';
import { CorralonsInterface } from './../corralons.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermisotaxiasignadosService } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados.service';
import { PermisotaxiasignadosAddModalComponent } from './../../../../permisotaxiasignados/components/permisotaxiasignados-table/permisotaxiasignados-add-modal/permisotaxiasignados-add-modal.component';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./corralons-add-modal.component.scss')],
  templateUrl: './corralons-add-modal.component.html'
})
export class CorralonsAddModalComponent extends DialogComponent<CorralonsInterface, any> implements OnInit {
  _permisotaxiasignado: string[] = [];

  fecha: string;
  infraccionNumero: number;
  corralonNombre: string;
  motivo: string;
  status: string;
  permisotaxiasignado_idpermisotaxiasignado: number;
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fechaAC: AbstractControl;
  infraccionNumeroAC: AbstractControl;
  corralonNombreAC: AbstractControl;
  motivoAC: AbstractControl;
  statusAC: AbstractControl;
  permisotaxiasignado_idpermisotaxiasignadoAC: AbstractControl;
  constructor(
    private service: CorralonsService,
      private permisotaxiasignadosService: PermisotaxiasignadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fechaAC' : [''],
    'infraccionNumeroAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'corralonNombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'motivoAC' : ['',Validators.compose([Validators.maxLength(150)])],
    'statusAC' : ['',Validators.compose([Validators.maxLength(25)])],
    'permisotaxiasignado_idpermisotaxiasignadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.fechaAC = this.form.controls['fechaAC'];
    this.infraccionNumeroAC = this.form.controls['infraccionNumeroAC'];
    this.corralonNombreAC = this.form.controls['corralonNombreAC'];
    this.motivoAC = this.form.controls['motivoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.permisotaxiasignado_idpermisotaxiasignadoAC = this.form.controls['permisotaxiasignado_idpermisotaxiasignadoAC'];
  }
  ngOnInit() {
      this.getPermisotaxiasignado();
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
  onSubmit(values: CorralonsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  fecha: this.fecha,
                  infraccionNumero: this.infraccionNumero,
                  corralonNombre: this.corralonNombre,
                  motivo: this.motivo,
                  status: this.status,
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
