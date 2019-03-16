import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
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
export class SummaryComponent implements OnInit {

  bookings = null;
  show = false;
  styles=null;
  selectedStyle="";
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
  seeDetailView(booking) {
    let id=booking.id;
    console.log("seedetailview"+booking);
    console.log(booking);
    this.router.navigate(["/bookings",id]);
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
     this.selectedStyle="";
     this.loadStyle();
    //  this.loadSummary();
       
  }
  // Load Summary
  loadSummary(){
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/api/booking/style/"+this.selectedStyle+"/",{headers}).subscribe((res)=>{
      console.log("Load summarry -------");
      console.log(res); 
      this.bookings=res;
    },(err)=>{
      console.log("error")
      console.log(err)
      if(err.status == 401)
      {
        this.router.navigate(["login"]);
      }
    })
  }
  // Loading Style data
  loadStyle(){
    let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/styles",{headers}).subscribe((res)=>{
       console.log("res");
       console.log(res); 
       this.styles=res;
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
