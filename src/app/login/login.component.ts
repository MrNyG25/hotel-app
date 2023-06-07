import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private usersService: UsersService, private router: Router){}

  ngOnInit(): void {
    

  }

  onSubmit(){
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    
    if(this.usersService.isValidUserData(email!, password!)){
      this.router.navigate(['admin'])
    }
  }
}
