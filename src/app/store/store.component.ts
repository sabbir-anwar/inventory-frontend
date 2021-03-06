import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
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
export class StoreComponent implements OnInit {

  stores = null;
  show = false;
  stages=null;
  locations=null;
  items=null;
  selectedStage="all";
  selectedItem="all";
  selectedLocation="all";
  showInventoryButton=false;
  constructor(private http:HttpClient,private router:Router) {

    let token=localStorage.getItem("token");
    if(localStorage.getItem("role")=="store_manager"){
      this.showInventoryButton = true;
    }
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
  seeDetailView(store) {
    let id=store.id;
    console.log("seedetailview"+store);
    console.log(store);
    this.router.navigate(["/stores",id]);
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
    this.selectedItem="all";
    this.selectedLocation="all";
    this.selectedStage="all"
     this.loadInventories();
     this.loadAllStages();
     this.loadLocations();
     this.loadItems();
     

  } 
  loadInventories()
  {
    console.log("sabbir");
    console.log(this.selectedItem);
    let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     let colorCode = "all";
     if (this.selectedItem!="all"){
      colorCode = this.selectedItem.split("##$")[1]
      this.selectedItem=this.selectedItem.split("##$")[0]
     }
     console.log(getHost()+"/api/stores/getby/"+this.selectedStage+"/"+this.selectedLocation+"/"+this.selectedItem+"/"+colorCode);
     this.http.get(getHost()+"/api/stores/getby/"+this.selectedStage+"/"+this.selectedLocation+"/"+this.selectedItem+"/"+colorCode,{headers}).subscribe((res)=>{
       console.log("res");
       console.log(res); 
       this.stores=res;
     },(err)=>{
       console.log("error")
       console.log(err)
       if(err.status == 401)
       {
         this.router.navigate(["login"]);
       }
     })  
  }
  loadAllStages()
  {
     let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/stages",{headers}).subscribe((res)=>{
       console.log("res");
       console.log(res); 
       this.stages=res;
     },(err)=>{
       console.log("error")
       console.log(err)
       if(err.status == 401)
       {
         this.router.navigate(["login"]);
       }
     })  
  }
  loadLocations()
  {
     let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/locations",{headers}).subscribe((res)=>{
       console.log("res");
       console.log(res); 
       this.locations=res;
     },(err)=>{
       console.log("error")
       console.log(err)
       if(err.status == 401)
       {
         this.router.navigate(["login"]);
       }
     })

  }
   loadItems()
  {
     let token=localStorage.getItem("token");
     let headers= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/items",{headers}).subscribe((res)=>{
       console.log("res");
       console.log(res); 
       this.items=res;
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
