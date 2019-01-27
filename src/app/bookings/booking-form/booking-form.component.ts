import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {

  @Input() payhead:any;
  @Output() messageEvent=new EventEmitter<boolean>();
  units=null;
  inventoryitems=null;
  styles=null; 
  item={
    quantity:"",
    unit_id:"",
    item_id:"",
    style_id:"",
    priceperunit:"",
    date:"",
    description:""
  }
  constructor(private http:HttpClient,private router:Router) {
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

  ngOnInit() {
    this.init();
  }
  lock = false;
  submit(){
    this.lock = true;
    if(this.item.quantity.length == 0||this.item.unit_id.length == 0|| this.item.item_id.length==0 ||this.item.style_id.length == 0 ||this.item.priceperunit.length == 0||this.item.date.length == 0) {
      return;
    }
    
      console.log(this.item);  
      let token=localStorage.getItem("token");
      let headers= new HttpHeaders().append("Authorization","Bearer "+token);
      
      this.http.post(getHost()+"/api/booking",this.item,{headers}).subscribe((res)=>{
        this.sendMessageToParent(this);
        this.init();      
        // this.lock = false;
        
     },(error)=>{
       if(error.status ==201)
       {
          this.sendMessageToParent(this);
          this.init();           
       }
     });
  }
  sendMessageToParent(message:any)  {
    this.messageEvent.emit(message);
  }
  cancel()
  {
    this.sendMessageToParent(false);
  }

  init(){
    this.item={
    quantity:"",
    unit_id:"",
    item_id:"",
    style_id:"",
    priceperunit:"",
    date:"",
    description:""
    }
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);

    this.http.get(getHost()+"/api/units",{headers}).subscribe((res)=>{
      this.units=res;
      console.log(this.item);  
    },(err)=>{
    console.log(err);  
    })
    this.http.get(getHost()+"/api/styles",{headers}).subscribe((res)=>{
      this.styles=res;
      console.log(this.item);  
    },(err)=>{
    console.log(err);  
    })
    this.http.get(getHost()+"/api/items",{headers}).subscribe((res)=>{
      this.inventoryitems=res;
      console.log(this.item);  
    },(err)=>{
    console.log(err);  
    })
  }

}
