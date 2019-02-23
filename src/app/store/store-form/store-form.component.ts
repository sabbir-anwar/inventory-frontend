import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-store-form',
  templateUrl: './store-form.component.html',
  styleUrls: ['./store-form.component.css']
})
export class StoreFormComponent implements OnInit {

  @Input() payhead:any;
  @Output() messageEvent=new EventEmitter<boolean>();
  stages=null;
  locations=null;
  inventoryitems=null;
  units=null;
  showloading=false;
  item={
    stage_id:"",
    location_id:"",
    item_id:"",
    unit_id:"",
    quantity:""
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
  submit()
  {
    this.lock = true;
    this.showloading=true;
    console.log("checking------");
    console.log(this.item);
    if(this.item.stage_id.length == 0||this.item.location_id.length == 0|| this.item.item_id.length==0|| this.item.unit_id.length==0|| this.item.quantity.length==0) 
    {
      return;
    }
    
    console.log(this.item);  
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
      
    this.http.post(getHost()+"/api/stores",this.item,{headers}).subscribe((res)=>{
      this.showloading=false;
      this.sendMessageToParent(this);
      this.init();
    },(error)=>{
      this.showloading=false;
       if(error.status ==201)
       {
          this.sendMessageToParent(this);
          this.init();           
       }
    });
    console.log("checking------End");
    console.log(this.item);
  }

  sendMessageToParent(message:any)  {
    this.messageEvent.emit(message);
  }
  
  cancel()
  {
    this.sendMessageToParent(false);
  }

  init(){
    this.lock=false;
    this.item={
      stage_id:"",
      location_id:"",
      item_id:"",
      unit_id:"",
      quantity:""
    }
    
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    // fetching stage objects
    this.http.get(getHost()+"/api/stages",{headers}).subscribe((res)=>{
      this.stages=res;
      console.log(this.item);
    },(err)=>{
      console.log(err);  
    })
    // fetching location object
    this.http.get(getHost()+"/api/locations",{headers}).subscribe((res)=>{
      this.locations=res;
      console.log(this.item);
    },(err)=>{
      console.log(err);  
    })
    // fetching item objects
    this.http.get(getHost()+"/api/items",{headers}).subscribe((res)=>{
      this.inventoryitems=res;
      console.log(this.item);
    },(err)=>{
      console.log(err);  
    })
    // fetching Unit objects
    this.http.get(getHost()+"/api/units",{headers}).subscribe((res)=>{
      this.units=res;
      console.log(this.item);
    },(err)=>{
      console.log(err);  
    })

  }
}
