import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-summary-detail',
  templateUrl: './summary-detail.component.html',
  styleUrls: ['./summary-detail.component.css'],
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
export class SummaryDetailComponent implements OnInit {

  booking_id:number;
  show:boolean;
  details:any;
  status:any;
  selectedstatus:any;
  
  constructor(private http:HttpClient,private route:ActivatedRoute, private router:Router) {
    this.show = false;
    let token=localStorage.getItem("token");
    let header= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/hello",{headers:header}).subscribe((res)=>{
       console.log(res);
      // this.router.navigate(["dashboard"]);
    },(err)=>{
       if(err.status==401)
       {
         this.router.navigate(["login"]); 
       }
      //this.router.navigate(["login"]); 
    });
   }
  itemName="";
  colorCode="all";
  availibility_info=null;
  total_available=0;
  loadItemAvailibilityStatus()
  {
     let token=localStorage.getItem("token");
     let header= new HttpHeaders().append("Authorization","Bearer "+token);
     console.log(getHost()+"/api/stores/getby/store/all/"+this.itemName+"/"+this.colorCode);
     this.http.get(getHost()+"/api/stores/getby/store/all/"+this.itemName+"/"+this.colorCode,{headers:header}).subscribe((res)=>{
         console.log("data is ada");
         console.log(res) 
         this.availibility_info=res;
        for(var c=0;c<this.availibility_info.length;c++)
        {
           this.total_available=this.total_available+this.availibility_info[c].quantity
        } 
      });
  }
 
  url ="";
  ngOnInit() {
    // this.endpoint=getHost()+"/api/units/";
    //catching the id from the url
    
    this.booking_id=parseInt(this.route.snapshot.paramMap.get('id'));
    this.url = getHost()+"/api/booking/"+this.booking_id;
    this.loadData();
  }
  loadData()
  {
    console.log("Inside loadData"+this.url);
    
    let token=localStorage.getItem("token");
    let header= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(this.url,{headers:header}).subscribe((response)=>{
    console.log(response);
    this.details = response;
    console.log("Details-----"+this.details);
    this.itemName=this.details.item.name
    this.colorCode = this.details.item.color_code
    this.loadItemAvailibilityStatus()
    });
    this.loadStatus();
  }
  loadStatus(){
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);

    this.http.get(getHost()+"/api/booking/avalilablestatus/"+this.booking_id+"/",{headers}).subscribe((res)=>{
      this.status=res; 
      console.log(status);
    },(err)=>{
    console.log(err);  
    })
  }
  //receving message from child component
  receiveMessage($event)
  {
      console.log("Message is "+$event); 
      this.show=false;
      
  }
  //while click on edit button show the form
  edit()
  {
     this.show=true;
  }
  
  //animation related methods amd properties
   get stateName(){
    return this.show ? 'show' : 'hide'  
  }

  submitStatus(){
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);

    this.http.get(getHost()+"/api/booking/"+this.booking_id+"/changestatus/"+this.selectedstatus,{headers}).subscribe((res)=>{
      this.status=res; 
      console.log(status);
    },(err)=>{
    console.log(err);  
    })
  }

}
