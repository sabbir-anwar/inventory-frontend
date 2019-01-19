import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
   categories=null;
   category={
     name:""
   }
  constructor(private http:HttpClient,private router:Router) { 
  
  
   let token=localStorage.getItem("token");
   let header= new HttpHeaders().append("Authorization","Bearer "+token);
   this.http.get(getHost()+"/hello",{headers:header}).subscribe((res)=>{
      console.log(res);
     // this.router.navigate(["dashboard"]);

   },(err)=>{
      console.log(err.status);
      if(err.status==401)
      {
        this.router.navigate(["login"]); 
      }

     //this.router.navigate(["login"]); 
   });

  }

  ngOnInit() {
    this.init();

  }
  submit(){
    let token=localStorage.getItem("token");
   let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.post(getHost()+"/api/categories",this.category,{headers}).subscribe((res)=>{
       this.init();
    },(error)=>{
      if(error.status ==201)
      {
         this.init();  
      }

    });
  }
  init(){
   let token=localStorage.getItem("token");
   let headers= new HttpHeaders().append("Authorization","Bearer "+token);
   this.http.get(getHost()+"/api/categories",{headers}).subscribe((res)=>{
      this.categories=res;  
      
   },(err)=>{
    console.log(err);  
   })
  }


}
