import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { 
  

   let token=localStorage.getItem("token");
   let header= new HttpHeaders().append("Authorization","Bearer "+token);
   this.http.get(getHost()+"/hello",{headers:header}).subscribe((res)=>{
      console.log(res);
      this.router.navigate(["dashboard"]);

   },(err)=>{
      console.log(err);
      this.router.navigate(["login"]); 
   });

  }

  ngOnInit() {
  }

}
