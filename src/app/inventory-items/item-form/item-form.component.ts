import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
   @Input() payhead:any;
   @Output() messageEvent=new EventEmitter<boolean>();
  categories=null;
  item={
    name:"",
    description:"",
    color_code:"",
   category_id:""

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
    if(this.item.name.length == 0||this.item.color_code.length == 0|| this.item.description.length==0) {
      return;
    }

    console.log(this.item);  
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.post(getHost()+"/api/items",this.item,{headers}).subscribe((res)=>{
      this.sendMessageToParent(this);
      this.init();
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
      name:"",
      description:"",
      color_code:"",
      category_id:""
  
    }
   let token=localStorage.getItem("token");
   let headers= new HttpHeaders().append("Authorization","Bearer "+token);
   this.http.get(getHost()+"/api/categories",{headers}).subscribe((res)=>{
      this.categories=res;
      console.log(this.categories);  
      //  this.sendMessageToParent(true);
      
   },(err)=>{
    console.log(err);  
   })
  }

}
