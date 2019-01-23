import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-inventory-items',
  templateUrl: './inventory-items.component.html',
  styleUrls: ['./inventory-items.component.css'],
  animations:[
    trigger('popOverState',[
       state('show',style({
         opacity:1,
         display:'inline-block'

       })),
       state('hide',style({
         opacity:0,
         display:'none'
       })),
       transition('show=>hide', animate('600ms ease-out')),
       transition('hide=>show', animate('600ms ease-in')),     

    ])
  ] 

})
export class InventoryItemsComponent implements OnInit {


 items=null; 
 show=false;
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

  get stateName(){
    return this.show ? 'show' : 'hide'  
  }

  addNew()
  {
    this.show=true;
  }
  receiveMessage($event)
  {
      this.show=false;
      this.init();
  }
  // receiveMessage($event)
  // {
  //     this.show=false;
  
  // }

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
