import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Boni_has_liquisService } from './../boni_has_liquis.service';
import { Boni_has_liquisInterface } from './../boni_has_liquis.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BonificacionsService } from './../../../../bonificacions/components/bonificacions-table/bonificacions.service';
import { BonificacionsAddModalComponent } from './../../../../bonificacions/components/bonificacions-table/bonificacions-add-modal/bonificacions-add-modal.component';
import { LiquidacionsService } from './../../../../liquidacions/components/liquidacions-table/liquidacions.service';
import { LiquidacionsAddModalComponent } from './../../../../liquidacions/components/liquidacions-table/liquidacions-add-modal/liquidacions-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./boni_has_liquis-edit-modal.component.scss')],
  templateUrl: './boni_has_liquis-edit-modal.component.html'
})
export class Boni_has_liquisEditModalComponent extends DialogComponent<Boni_has_liquisInterface, any> implements OnInit, Boni_has_liquisInterface {
  _bonificacion: string[] = [];
  _liquidacion: string[] = [];

  bonificacion_idbonificacion: number;
  liquidacion_idliquidacion: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  bonificacion_idbonificacionAC: AbstractControl;
  liquidacion_idliquidacionAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: Boni_has_liquisService,
      private bonificacionsService: BonificacionsService,
      private liquidacionsService: LiquidacionsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'bonificacion_idbonificacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'liquidacion_idliquidacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'bajaAC' : [''],
    'created_byAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'created_atAC' : [''],
    'modified_atAC' : [''],
  });
  this.bonificacion_idbonificacionAC = this.form.controls['bonificacion_idbonificacionAC'];
  this.liquidacion_idliquidacionAC = this.form.controls['liquidacion_idliquidacionAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getBonificacion();
      this.getLiquidacion();
  }

  bonificacionAddModalShow() {
      const disposable = this.dialogService.addDialog(BonificacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.bonificacionShowToast(data);
          }
      })
  }

  bonificacionShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getBonificacion();
      } else {
          this.toastrService.error(result.message);
      }
  }
  liquidacionAddModalShow() {
      const disposable = this.dialogService.addDialog(LiquidacionsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.liquidacionShowToast(data);
          }
      })
  }

  liquidacionShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getLiquidacion();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getBonificacion() {
      this.bonificacionsService.all()
      .subscribe(
          (data: any) => this._bonificacion = data.result,
      );
  }
  getLiquidacion() {
      this.liquidacionsService.all()
      .subscribe(
          (data: any) => this._liquidacion = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Boni_has_liquisInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  bonificacion_idbonificacion: this.bonificacion_idbonificacion,
                  liquidacion_idliquidacion: this.liquidacion_idliquidacion,
                  baja: this.baja,
                  created_by: this.created_by,
                  created_at: this.created_at,
                  modified_at: this.modified_at,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
