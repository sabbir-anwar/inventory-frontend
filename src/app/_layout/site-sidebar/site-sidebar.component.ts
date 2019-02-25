import { Component, OnInit } from '@angular/core';

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
      name: 'Inventories',
      link: '/inventories'
    },
    {
      name:'Booking',
      link: '/bookings'
    },
    {
      name:'Purchase',
      link: '/purchases'
    },
    {
      name: 'Buyer',
      link: '/clients'
    },
    {
      name: 'Project',
      link: '/projects'
    },
    {
      name: 'Style',
      link: '/styles'
    },
    {
      name:'Inventory Items',
      link:'/items'
    },
    {
      name: 'Category',
      link: '/categories'
    },
    {
      name: 'Unit',
      link: '/units'
    },
    {
      name: 'Location',
      link: '/locations'
    },
    {
      name: 'Stage',
      link: '/stage'
    }
  
]
  constructor() { }

  ngOnInit() {
  }

}
