import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthClientsService } from '../../shared/auth-clients.service';
import { PasswordService } from 'src/app/shared/password.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePwd: FormGroup;
  errors = null;
  mssg = null;
  submitted = false;

  constructor(
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    // public authService: AuthClientsService,
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
    if(!this.updatePwd.invalid && this.updatePwd.controls.password_confirmation.value == this.updatePwd.controls.password.value){
    this.submitted = true;
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
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
      } else {
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMsg);
  }

}
