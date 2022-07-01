import { Input, Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../../services/authentication/authentication.service'
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  credentials: TokenPayload = {
    _id: '',
    fullName: '',
    userName: '',
    email: '',
    password: ''
  }

  constructor(private auth: AuthenticationService,private router: Router){}

  form: FormGroup = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.pattern("[^ @]*@[^ @]*")
    ]),
    password: new FormControl('', Validators.required)
  });

  submit() {
    console.log("Login Button");
    // alert("Login Button Clicked")
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/todo']);
      },
      err => {
        console.error(err)
      }
    )
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
  }

  onClickRegister() {
    console.log("Register button clicked");
    this.router.navigate(['/register']);
  }

  onClickLogin() {
    console.log("Login button clicked");
    
  }

  @Input() error: string | null;

  @Output() submitEM = new EventEmitter();


}