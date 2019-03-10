import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';


@Component({
  selector: 'app-site-sidebar',
  templateUrl: './site-sidebar.component.html',
  styleUrls: ['./site-sidebar.component.css']
})
export class SiteSidebarComponent implements OnInit {
  title='IMS';
  menuItems=[
   /* {
      name:'Dashboard',
      link:'/dashboard'
    }*/
    {
      name:'Summary',
      link: '/summary',
      varname:"summary"
    },
    {
      name:'Booking',
      link: '/bookings',
      varname:"booking"
    },
    {
      name:'Purchase',
      link: '/purchases',
      varname:"purchase"
    },
    {
      name: 'Inventories',
      link: '/inventories',
      varname:"inventory"
    },
    {
      name: 'Buyer',
      link: '/clients',
      varname:"buyer"
    },
    {
      name: 'Project',
      link: '/projects',
      varname:"project"
    },
    {
      name: 'Style',
      link: '/styles',
      varname:"style"
    },
    {
      name:'Inventory Items',
      link:'/items',
      varname:"InventoryItems"
    },
    {
      name: 'Category',
      link: '/categories',
      varname:"category"
    },
    {
      name: 'Stage',
      link: '/stage',
      varname:"stage"
    },
    {
      name: 'Location',
      link: '/locations',
      varname:"location"
    },
    {
      name: 'Unit',
      link: '/units',
      varname:"unit"
    } 
]
   available_menu_items=null;
   constructor(private http:HttpClient) {

    let token=localStorage.getItem("token");
    let header= new HttpHeaders().append("Authorization","Bearer "+token);
    this.http.get(getHost()+"/api/users/menuitems",{headers:header}).subscribe((res)=>{
      console.log("menu items are:: ")
      this.available_menu_items=res;
      console.log(res);


   });

  }

  ngOnInit() {


  }

}
