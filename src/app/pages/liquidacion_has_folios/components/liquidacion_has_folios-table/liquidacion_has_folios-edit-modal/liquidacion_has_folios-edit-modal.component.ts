import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Liquidacion_has_foliosService } from './../liquidacion_has_folios.service';
import { Liquidacion_has_foliosInterface } from './../liquidacion_has_folios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LiquidacionsService } from './../../../../liquidacions/components/liquidacions-table/liquidacions.service';
import { LiquidacionsAddModalComponent } from './../../../../liquidacions/components/liquidacions-table/liquidacions-add-modal/liquidacions-add-modal.component';
import { FoliosService } from './../../../../folios/components/folios-table/folios.service';
import { FoliosAddModalComponent } from './../../../../folios/components/folios-table/folios-add-modal/folios-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./liquidacion_has_folios-edit-modal.component.scss')],
  templateUrl: './liquidacion_has_folios-edit-modal.component.html'
})
export class Liquidacion_has_foliosEditModalComponent extends DialogComponent<Liquidacion_has_foliosInterface, any> implements OnInit, Liquidacion_has_foliosInterface {
  _liquidacion: string[] = [];
  _folio: string[] = [];

  liquidacion_idliquidacion: number;
  folio_idfolio: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  liquidacion_idliquidacionAC: AbstractControl;
  folio_idfolioAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
      private service: Liquidacion_has_foliosService,
      private liquidacionsService: LiquidacionsService,
      private foliosService: FoliosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'liquidacion_idliquidacionAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'folio_idfolioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'bajaAC' : [''],
    'created_byAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'created_atAC' : [''],
    'modified_atAC' : [''],
  });
  this.liquidacion_idliquidacionAC = this.form.controls['liquidacion_idliquidacionAC'];
  this.folio_idfolioAC = this.form.controls['folio_idfolioAC'];
  this.bajaAC = this.form.controls['bajaAC'];
  this.created_byAC = this.form.controls['created_byAC'];
  this.created_atAC = this.form.controls['created_atAC'];
  this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getLiquidacion();
      this.getFolio();
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
  folioAddModalShow() {
      const disposable = this.dialogService.addDialog(FoliosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.folioShowToast(data);
          }
      })
  }

  folioShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getFolio();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getLiquidacion() {
      this.liquidacionsService.all()
      .subscribe(
          (data: any) => this._liquidacion = data.result,
      );
  }
  getFolio() {
      this.foliosService.all()
      .subscribe(
          (data: any) => this._folio = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Liquidacion_has_foliosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  liquidacion_idliquidacion: this.liquidacion_idliquidacion,
                  folio_idfolio: this.folio_idfolio,
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
