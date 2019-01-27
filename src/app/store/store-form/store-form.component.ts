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
  store=null;
  item={
    stage:"",
    location:"",
    unit:"",
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
  submit(){
    this.lock = true;
    if(this.item.stage.length == 0||this.item.location.length == 0|| this.item.unit.length==0|| this.item.quantity.length==0) {
      return;
    }
    
      console.log(this.item);  
      let token=localStorage.getItem("token");
      let headers= new HttpHeaders().append("Authorization","Bearer "+token);
      
      this.http.post(getHost()+"/api/store",this.item,{headers}).subscribe((res)=>{
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
      stage:"",
      location:"",
      unit:"",
      quantity:""
    }
    
    let token=localStorage.getItem("token");
    
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/api/store",{headers}).subscribe((res)=>{
      this.store=res;
      console.log(this.item);  
      //  this.sendMessageToParent(true);
      
   },(err)=>{
    console.log(err);  
   })
  }
}
