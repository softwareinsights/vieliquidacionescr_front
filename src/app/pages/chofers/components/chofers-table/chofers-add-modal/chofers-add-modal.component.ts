import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ChofersService } from './../chofers.service';
import { ChofersInterface } from './../chofers.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./chofers-add-modal.component.scss')],
  templateUrl: './chofers-add-modal.component.html'
})
export class ChofersAddModalComponent extends DialogComponent<ChofersInterface, any> implements OnInit {
  _persona: string[] = [];

  licencia: string;
  fianza: number;
  status: string;
  chofer: number;
  aval1: number;
  aval2: number;
  aval3: number;
  aval4: number;
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  licenciaAC: AbstractControl;
  fianzaAC: AbstractControl;
  statusAC: AbstractControl;
  choferAC: AbstractControl;
  aval1AC: AbstractControl;
  aval2AC: AbstractControl;
  aval3AC: AbstractControl;
  aval4AC: AbstractControl;
  constructor(
    private service: ChofersService,
      private personasService: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'licenciaAC' : ['',Validators.compose([Validators.maxLength(40)])],
    'fianzaAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'statusAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'choferAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval1AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval2AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval3AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'aval4AC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.licenciaAC = this.form.controls['licenciaAC'];
    this.fianzaAC = this.form.controls['fianzaAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.choferAC = this.form.controls['choferAC'];
    this.aval1AC = this.form.controls['aval1AC'];
    this.aval2AC = this.form.controls['aval2AC'];
    this.aval3AC = this.form.controls['aval3AC'];
    this.aval4AC = this.form.controls['aval4AC'];
  }
  ngOnInit() {
      this.getPersona();
  }
  personaAddModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.personaShowToast(data);
          }
      })
  }
  personaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPersona();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ChofersInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  licencia: this.licencia,
                  fianza: this.fianza,
                  status: this.status,
                  chofer: this.chofer,
                  aval1: this.aval1,
                  aval2: this.aval2,
                  aval3: this.aval3,
                  aval4: this.aval4,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
