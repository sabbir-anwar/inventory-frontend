import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.css'],
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
export class StoreDetailComponent implements OnInit {

  store_id:number;
  show:boolean;
  details:any;
  status:any;


  move={
    from_store:0,
    to_stage:'',
    quntity:0,
    description:'',
    to_location:''
    
 }

 isAdmin=false;
 isStoreManager=false;
 isOwner=false;

  constructor(private http:HttpClient,private route:ActivatedRoute, private router:Router) {
    this.show = false;
    let token=localStorage.getItem("token");
    let header= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/hello",{headers:header}).subscribe((res)=>{
       console.log("here I am");
       

      // this.router.navigate(["dashboard"]);
    },(err)=>{
       if(err.status==401)
       {
         this.router.navigate(["login"]); 
       }
       if(err.status==200)
       {
         this.http.get(getHost()+"/api/info/user/role",{headers:header}).subscribe((res)=>{
          console.log("roles are")
          console.log(res);
          this.processRoles(res); 
       }); 
       }
      //this.router.navigate(["login"]); 
    });
   }

 
 processRoles(roles)
 {
   for (var c=0;c<roles.length;c++)
   {
     
      if(roles[c].role =='admin' )
      {
        this.isAdmin=true;
      }
      else if(roles[c].role =='store_manager' )
      {
        this.isStoreManager=true;
      }
   }
 }

  url ="";
  ngOnInit() {
    // this.endpoint=getHost()+"/api/units/";
    //catching the id from the url
    
    this.store_id=parseInt(this.route.snapshot.paramMap.get('id'));
    this.move.from_store=this.store_id;
    this.url = getHost()+"/api/stores/"+this.store_id;
    this.loadData();
  }
  loadData()
  {
    this.move={
    from_store:this.store_id,
    to_stage:'',
    quntity:0,
    description:'',
    to_location:''
    
 }
    console.log("Inside loadData"+this.url);
    let token=localStorage.getItem("token");
    let header= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(this.url,{headers:header}).subscribe((response)=>{
    console.log(response);
    this.details = response;
    });
    this.loadLocations();
    this.loadStages(); 
  }
  //receving message from child component
locations=null;
stages=null;

submitMoveRequest()
{
     let token=localStorage.getItem("token");
     let header= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.post(getHost()+"/api/stores/moveitem",this.move,{headers:header}).subscribe((response)=>{
     console.log(response);
     
     alert(response);
     this.loadData()
    },(error)=>{

      if(error.status == 200)
      {
        console.log(error);
        alert("Successfully moved.");
        this.loadData()
      }
    });

}
loadLocations()
{
    let token=localStorage.getItem("token");
     let header= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/locations",{headers:header}).subscribe((response)=>{
     console.log(response);
     this.locations = response;
    });
}
loadStages()
{
let token=localStorage.getItem("token");
     let header= new HttpHeaders().append("Authorization","Bearer "+token);
     this.http.get(getHost()+"/api/stages",{headers:header}).subscribe((response)=>{
     console.log(response);
     this.stages = response;
    });
}

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
}
