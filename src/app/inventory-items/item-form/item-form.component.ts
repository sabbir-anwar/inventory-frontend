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
  showloading=false;
  itemid=null;
  files=null;
  item={
    name:"",
    id:"",
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
  file;
  lock = false;  
   onFileChange(event) {
    if(event.target.files.length > 0) {
      this.file = event.target.files[0];
      console.log("File is ::::"+this.file)
    }
  }
  submit(){
    this.lock = true;
    this.showloading=true;
    if(this.item.name.length == 0||this.item.color_code.length == 0) {
      return;
    }
    

     
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.post(getHost()+"/api/items",this.item,{headers}).subscribe((res)=>{
      this.showloading=false;
      this.sendMessageToParent(this);
      //this.init();
      console.log("Item id is : "+res);
      this.itemid = res;
      this.onUpload(this.itemid);
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
  onUpload(itemid){
    console.log("I am here inside onUpload");
    const fd = new FormData();
    fd.append("itemid",itemid);
    fd.append("files",this.file);
    console.log(this.file);
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.post(getHost()+"/api/file/upload/",fd,{headers}).subscribe((res)=>{
      this.init();
    });
  }
  init(){
    this.item={
      name:"",
      id:"",
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
      console.log("item id init:::"+this.item.id);
      // this.onUpload(this.item.id);
   },(err)=>{
    console.log(err);  
   })

  }

}
