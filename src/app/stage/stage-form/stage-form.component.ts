import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {

  @Input() payhead:any;
  @Output() messageEvent=new EventEmitter<boolean>();
  stages=null;
  showloading=false;
  item={
    name:"",
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
    this.showloading=true;
    if(this.item.name.length == 0||this.item.description.length==0) {
      return;
    }
    
      console.log(this.item);  
      let token=localStorage.getItem("token");
      let headers= new HttpHeaders().append("Authorization","Bearer "+token);
      
      this.http.post(getHost()+"/api/stages",this.item,{headers}).subscribe((res)=>{
        this.showloading=false;
        this.sendMessageToParent(this);
        this.init();      
        // this.lock = false;
        
     },(error)=>{
      this.showloading=false;
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
      name:"",
      description:""
    }
    
    let token=localStorage.getItem("token");
    
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/api/stages",{headers}).subscribe((res)=>{
      this.stages=res;
      console.log(this.item);  
      //  this.sendMessageToParent(true);
      
   },(err)=>{
    console.log(err);  
   })
  }
}
