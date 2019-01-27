import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';
import {trigger,state,style,animate,transition} from '@angular/animations';

@Component({
  selector: 'app-projects-detail',
  templateUrl: './projects-detail.component.html',
  styleUrls: ['./projects-detail.component.css'],
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
export class ProjectsDetailComponent implements OnInit {
  project_id:number;
  name:string;
  description:any;
  show:boolean;
  styles:any;
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

 
  url ="";
  ngOnInit() {
    // this.endpoint=getHost()+"/api/units/";
    //catching the id from the url
    
    this.project_id=parseInt(this.route.snapshot.paramMap.get('id'));
    this.url = getHost()+"/api/styles/project/"+this.project_id;
    //Http://localhost:8080/api/styles/project/99
    this.loadData();
    
  }
  loadData()
  {
    console.log("Inside loadData"+this.url);
    let token=localStorage.getItem("token");
    let header= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(this.url,{headers:header}).subscribe((response)=>{
    console.log(response);
    this.styles = response;
     
    });
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

}

