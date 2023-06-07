import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  arr = [1,3];
  ngOnInit(): void {
    
    console.log(this.arr)
  }
}
