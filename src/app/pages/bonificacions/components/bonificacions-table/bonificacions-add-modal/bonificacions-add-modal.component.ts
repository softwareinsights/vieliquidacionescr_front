import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { BonificacionsService } from './../bonificacions.service';
import { BonificacionsInterface } from './../bonificacions.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ChofersService } from './../../../../chofers/components/chofers-table/chofers.service';
import { ChofersAddModalComponent } from './../../../../chofers/components/chofers-table/chofers-add-modal/chofers-add-modal.component';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./bonificacions-add-modal.component.scss')],
  templateUrl: './bonificacions-add-modal.component.html'
})
export class BonificacionsAddModalComponent extends DialogComponent<BonificacionsInterface, any> implements OnInit {
  _chofer: string[] = [];

  cantidad: string;
  validado: boolean;
  status: string;
  concepto: string;
  chofer_idchofer: number;
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  cantidadAC: AbstractControl;
  validadoAC: AbstractControl;
  statusAC: AbstractControl;
  conceptoAC: AbstractControl;
  chofer_idchoferAC: AbstractControl;
  constructor(
    private service: BonificacionsService,
      private chofersService: ChofersService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'cantidadAC' : [''],
    'validadoAC' : [''],
    'statusAC' : ['',Validators.compose([Validators.maxLength(25)])],
    'conceptoAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'chofer_idchoferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.cantidadAC = this.form.controls['cantidadAC'];
    this.validadoAC = this.form.controls['validadoAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.conceptoAC = this.form.controls['conceptoAC'];
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
  onSubmit(values: BonificacionsInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  cantidad: this.cantidad,
                  validado: this.validado,
                  status: this.status,
                  concepto: this.concepto,
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
