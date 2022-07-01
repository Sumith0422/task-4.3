import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})


export class RegisterComponent{

  credentials: TokenPayload = {
    _id: '',
    userName: '',
    fullName: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService, private router: Router) {}

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    fullname: new FormControl('', Validators.required),
    emailid: new FormControl('',[
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
  ]),
    password: new FormControl('', [
      Validators.minLength(8), 
      Validators.required
  ]),
    repassword: new FormControl('', [
      Validators.minLength(8), 
      Validators.required
  ])
  });

  submit() {
    console.log("Login Button");
    
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
      console.log(this.form.value);
      
      //Go to TODO page
      this.auth.register(this.credentials).subscribe(
        () => {
          debugger
          this.router.navigate(['/todo']);        },
        err => {
          console.error(err)
        }
      )
    }
  }

  onClickHaveAccount() {
    console.log("Back to login clicked");
    this.router.navigate(['/login']);
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();

}