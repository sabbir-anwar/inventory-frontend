import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css']
})
export class InventoryItemsComponent implements OnInit {


 items=null; 
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
    this.init()
  }
  init()
  {
     let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/items",{headers}).subscribe((res)=>{
       console.log("res");
       console.log(res); 
       this.items=res;
     },(err)=>{
       console.log("error")
       console.log(err)
       if(err.status == 401)
       {
         this.router.navigate(["login"]);
       }
     })  
  } 
}
