import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FoliosService } from './../folios.service';
import { FoliosInterface } from './../folios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'add-service-modal',
  styleUrls: [('./folios-add-modal.component.scss')],
  templateUrl: './folios-add-modal.component.html'
})
export class FoliosAddModalComponent extends DialogComponent<FoliosInterface, any> implements OnInit {

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
    dialogService: DialogService
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
        .insert({
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
