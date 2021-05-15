import { Component, OnInit } from '@angular/core';
import { AuthClientsService } from '../../shared/auth-clients.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordService } from 'src/app/shared/password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  myForm: FormGroup;
  err! : any;
  mssg!: any;
  submitted = false;


  constructor(
    public fb: FormBuilder,
    // public jwtService: AuthClientsService
    public passwordService: PasswordService
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void { }

  onSubmit(){
    this.submitted = true;
    if(!this.myForm.invalid){
    this.passwordService.reqPasswordReset(this.myForm.value).subscribe(
      (res) => {
        this.mssg = res;
      },(error) => {
        this.err = error.error.message;
      })
  }
}

}
