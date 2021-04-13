import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
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

  constructor(
    public fb: FormBuilder,
    public activatedRoute: ActivatedRoute,
    // public authService: AuthClientsService,
    public passwordService: PasswordService
  ) {
    this.updatePwd = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: ['']
    })
    activatedRoute.queryParams.subscribe((params) => {
      this.updatePwd.controls['passwordToken'].setValue(params['token']);
    })
  }

  ngOnInit(): void { }

  onSubmit(){
    this.passwordService.updatePassword(this.updatePwd.value).subscribe(
      result => {
        alert('Password updated successfully');
        console.log(this.updatePwd.value)
        this.updatePwd.reset();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error: any) {
      let errorMsg = '';
      if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
      } else {
          errorMsg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMsg);
      return throwError(errorMsg);
  }

}
