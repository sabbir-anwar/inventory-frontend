import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-styles-form',
  templateUrl: './styles-form.component.html',
  styleUrls: ['./styles-form.component.css']
})
export class StylesFormComponent implements OnInit {

  @Input() payhead:any;
  @Output() messageEvent=new EventEmitter<boolean>();
  projects=null;
  showloading=false;
  item={
    name:"",
    description:"",
    project_id:""
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
    if(this.item.name.length == 0||this.item.description.length==0||this.item.project_id.length==0) {
      return;
    }
    
      console.log(this.item);  
      let token=localStorage.getItem("token");
      let headers= new HttpHeaders().append("Authorization","Bearer "+token);
      
      this.http.post(getHost()+"/api/styles",this.item,{headers}).subscribe((res)=>{
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
      description:"",
      project_id:""
    }
    
    let token=localStorage.getItem("token");
    
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/api/projects",{headers}).subscribe((res)=>{
      this.projects=res;
      console.log(this.item);  
      //  this.sendMessageToParent(true);
      
   },(err)=>{
    console.log(err);  
   })
  }

}
