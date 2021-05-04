import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { PasswordService } from 'src/app/shared/password.service';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePwd: FormGroup;
  errors!: any;
  mssg!: any;
  submitted = false;

  constructor(
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public passwordService: PasswordService
  ) {
    this.updatePwd = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,10}$')])]],
      password_confirmation: ['',Validators.required],
      passwordToken: ['']
    });
    activatedRoute.queryParams.subscribe((params) => {
      this.updatePwd.controls['passwordToken'].setValue(params['token']);
    });
    console.log(this.updatePwd);
  }

  ngOnInit(): void { }

  onSubmit(){ 
    this.submitted = true;
    if(!this.updatePwd.invalid && this.updatePwd.controls.password_confirmation.value == this.updatePwd.controls.password.value){
    this.submitted = false;
    this.passwordService.updatePassword(this.updatePwd.value).subscribe(
      data => {
        this.mssg = data;
        console.log(data);
        console.log(this.updatePwd.value)
        this.updatePwd.reset();
        this.submitted = false;
      },
      error => {
        this.handleError(error);
      },
    );
    }
  }

  handleError(error: any) {
      if (error.error instanceof ErrorEvent) {
          this.errors = `Error: ${error.error.message}`;
      } else {
          this.errors = error.error.error;
      }
  }

}
