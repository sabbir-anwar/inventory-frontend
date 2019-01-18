import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http:HttpClient,public router:Router) { }
  
  user={
    username:'',
    password:''
  }
  message="";
  ngOnInit() {
  }
  submit(){
   
    this.http.post(getHost()+"/api/auth/signin",this.user).subscribe((data)=>{
      console.log(data);
      let d:any=data;
      localStorage.setItem("token",d.accessToken);
      this.router.navigate(["/dashboard"]);
      this.message=""
    },(err)=>{
       console.log(err);
       this.message="Username or password error";
    })
  }

}
