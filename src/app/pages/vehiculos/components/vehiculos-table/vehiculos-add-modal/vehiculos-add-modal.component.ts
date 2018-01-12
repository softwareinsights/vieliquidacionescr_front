import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { VehiculosService } from './../vehiculos.service';
import { VehiculosInterface } from './../vehiculos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./vehiculos-add-modal.component.scss')],
  templateUrl: './vehiculos-add-modal.component.html'
})
export class VehiculosAddModalComponent extends DialogComponent<VehiculosInterface, any> implements OnInit {
  _persona: string[] = [];

  marca: string;
  modelo: string;
  anio: number;
  serie: string;
  serieMotor: string;
  placa: string;
  kilometraje: number;
  status: string;
  poliza: string;
  polizaTipo: string;
  condActual: string;
  condInicial: string;
  color: string;
  propietario: number;
  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  marcaAC: AbstractControl;
  modeloAC: AbstractControl;
  anioAC: AbstractControl;
  serieAC: AbstractControl;
  serieMotorAC: AbstractControl;
  placaAC: AbstractControl;
  kilometrajeAC: AbstractControl;
  statusAC: AbstractControl;
  polizaAC: AbstractControl;
  polizaTipoAC: AbstractControl;
  condActualAC: AbstractControl;
  condInicialAC: AbstractControl;
  colorAC: AbstractControl;
  propietarioAC: AbstractControl;
  constructor(
    private service: VehiculosService,
      private personasService: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'marcaAC' : ['',Validators.compose([Validators.maxLength(20)])],
    'modeloAC' : ['',Validators.compose([Validators.maxLength(20)])],
    'anioAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'serieAC' : ['',Validators.compose([Validators.maxLength(30)])],
    'serieMotorAC' : ['',Validators.compose([Validators.maxLength(40)])],
    'placaAC' : ['',Validators.compose([Validators.maxLength(10)])],
    'kilometrajeAC' : ['',Validators.compose([Validators.maxLength(11)])],
    'statusAC' : ['',Validators.compose([Validators.maxLength(15)])],
    'polizaAC' : ['',Validators.compose([Validators.maxLength(15)])],
    'polizaTipoAC' : ['',Validators.compose([Validators.maxLength(15)])],
    'condActualAC' : ['',Validators.compose([Validators.maxLength(150)])],
    'condInicialAC' : ['',Validators.compose([Validators.maxLength(150)])],
    'colorAC' : ['',Validators.compose([Validators.maxLength(20)])],
    'propietarioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    });
    this.marcaAC = this.form.controls['marcaAC'];
    this.modeloAC = this.form.controls['modeloAC'];
    this.anioAC = this.form.controls['anioAC'];
    this.serieAC = this.form.controls['serieAC'];
    this.serieMotorAC = this.form.controls['serieMotorAC'];
    this.placaAC = this.form.controls['placaAC'];
    this.kilometrajeAC = this.form.controls['kilometrajeAC'];
    this.statusAC = this.form.controls['statusAC'];
    this.polizaAC = this.form.controls['polizaAC'];
    this.polizaTipoAC = this.form.controls['polizaTipoAC'];
    this.condActualAC = this.form.controls['condActualAC'];
    this.condInicialAC = this.form.controls['condInicialAC'];
    this.colorAC = this.form.controls['colorAC'];
    this.propietarioAC = this.form.controls['propietarioAC'];
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
  onSubmit(values: VehiculosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  marca: this.marca,
                  modelo: this.modelo,
                  anio: this.anio,
                  serie: this.serie,
                  serieMotor: this.serieMotor,
                  placa: this.placa,
                  kilometraje: this.kilometraje,
                  status: this.status,
                  poliza: this.poliza,
                  polizaTipo: this.polizaTipo,
                  condActual: this.condActual,
                  condInicial: this.condInicial,
                  color: this.color,
                  propietario: this.propietario,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
