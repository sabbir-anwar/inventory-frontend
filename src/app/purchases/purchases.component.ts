import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css'],
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
export class PurchasesComponent implements OnInit {

  purchases = null;
  show = false;
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
  form = null;
  TriggerEvent($event) {
    if(this.form!=null) {
      this.form.lock = false;
      console.log("Check trigger");
    }
    console.log("triggered here");
    // this.form.lock = false;
  }
  receiveMessage($event)
  {
    if($event===true || $event===false) {
    
    }
    else {
      // $event.lock = false;
      this.form = $event;
    }
    console.log($event+"Prob here");
      this.show=false;
      this.init();
  }
  init()
  {
     let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/purchases",{headers}).subscribe((res)=>{
       console.log("Here are the purchase response");
       console.log(res); 
       this.purchases=res;
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
