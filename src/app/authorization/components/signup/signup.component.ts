import { Component, OnInit, Output } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { SignUpData } from "../../models";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "cc-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;

  @Output() signUp: EventEmitter<SignUpData> = new EventEmitter<SignUpData>();

  constructor() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup(
        {
          firstName: new FormControl(null, [Validators.required]),
          lastName: new FormControl(null, [Validators.required]),
          email: new FormControl(null, [
            Validators.required,
            Validators.email,
            this.forbiddenEmails,
          ]),
          password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            this.weakPassword,
          ]),
          confirmPassword: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            this.weakPassword,
          ]),
          file: new FormControl(null, [Validators.required]),
          fileSource: new FormControl('', [Validators.required])
        },
        { validators: this.passwordsMatch }
      ),
    });
  }

  ngOnInit() {
    
  }

  forbiddenEmails(control: FormControl): ValidationErrors | null {
    if (control.value && control.value.endsWith('.ru')) {
      return { emailIsForbidden: true };
    } else {
      return null;

    }
  }

  weakPassword(control: FormControl): ValidationErrors | null {
    if(control.value && /^[a-z0-9]+$/.test(control.value)) {
      return { weakPassword: true };
    } else {
      return null;
    }
  } 

  passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get("password")?.value;
    const confirmPassword = control.get("confirmPassword")?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const userData = this.signUpForm.value.userData;
      const reader = new FileReader();
      reader.readAsDataURL(userData.fileSource);
      reader.onload = () => {
        const signUpData: SignUpData = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          profilePicture: reader.result as string,
        };
        this.signUp.emit(signUpData);
      };
    }
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;


    if (target && target?.files) {
      const file = target.files[0];
      this.signUpForm.patchValue({
        userData: {
          fileSource: file,
        }
      });
    }
  }
}
