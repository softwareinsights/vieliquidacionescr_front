import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FoliosService } from './../folios.service';
import { FoliosInterface } from './../folios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./folios-edit-modal.component.scss')],
  templateUrl: './folios-edit-modal.component.html'
})
export class FoliosEditModalComponent extends DialogComponent<FoliosInterface, any> implements OnInit, FoliosInterface {

  idfolio: number;
  fecha: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  fechaAC: AbstractControl;
  constructor(
      private service: FoliosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'fechaAC' : [''],
  });
  this.fechaAC = this.form.controls['fechaAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: FoliosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idfolio: this.idfolio,
                  fecha: this.fecha,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
