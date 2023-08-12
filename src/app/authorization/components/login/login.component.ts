import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginData } from '../../models';

@Component({
  selector: 'cc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  
  @Output() login: EventEmitter<LoginData> = new EventEmitter<LoginData>();

  constructor() { 
    this.signInForm = new FormGroup({
      userData: new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required])
      }),
    });
  }

  ngOnInit() {
    
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const userData = this.signInForm.value.userData;
      this.login.emit(userData);
    }
  }
}
