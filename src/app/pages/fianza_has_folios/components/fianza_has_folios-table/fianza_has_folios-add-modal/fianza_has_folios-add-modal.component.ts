import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Fianza_has_foliosService } from './../fianza_has_folios.service';
import { Fianza_has_foliosInterface } from './../fianza_has_folios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FianzasService } from './../../../../fianzas/components/fianzas-table/fianzas.service';
import { FianzasAddModalComponent } from './../../../../fianzas/components/fianzas-table/fianzas-add-modal/fianzas-add-modal.component';
import { FoliosService } from './../../../../folios/components/folios-table/folios.service';
import { FoliosAddModalComponent } from './../../../../folios/components/folios-table/folios-add-modal/folios-add-modal.component';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./fianza_has_folios-add-modal.component.scss')],
  templateUrl: './fianza_has_folios-add-modal.component.html'
})
export class Fianza_has_foliosAddModalComponent extends DialogComponent<Fianza_has_foliosInterface, any> implements OnInit {
  _fianza: string[] = [];
  _folio: string[] = [];

  fianza_idfianza: number;
  folio_idfolio: number;
  baja: boolean;
  created_by: number;
  created_at: string;
  modified_at: string;
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  fianza_idfianzaAC: AbstractControl;
  folio_idfolioAC: AbstractControl;
  bajaAC: AbstractControl;
  created_byAC: AbstractControl;
  created_atAC: AbstractControl;
  modified_atAC: AbstractControl;
  constructor(
    private service: Fianza_has_foliosService,
      private fianzasService: FianzasService,
      private foliosService: FoliosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'fianza_idfianzaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'folio_idfolioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'bajaAC' : [''],
    'created_byAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'created_atAC' : [''],
    'modified_atAC' : [''],
    });
    this.fianza_idfianzaAC = this.form.controls['fianza_idfianzaAC'];
    this.folio_idfolioAC = this.form.controls['folio_idfolioAC'];
    this.bajaAC = this.form.controls['bajaAC'];
    this.created_byAC = this.form.controls['created_byAC'];
    this.created_atAC = this.form.controls['created_atAC'];
    this.modified_atAC = this.form.controls['modified_atAC'];
  }
  ngOnInit() {
      this.getFianza();
      this.getFolio();
  }
  fianzaAddModalShow() {
      const disposable = this.dialogService.addDialog(FianzasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.fianzaShowToast(data);
          }
      })
  }
  fianzaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getFianza();
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
  getFianza() {
      this.fianzasService.all()
      .subscribe(
          (data: any) => this._fianza = data.result,
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
  onSubmit(values: Fianza_has_foliosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  fianza_idfianza: this.fianza_idfianza,
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
