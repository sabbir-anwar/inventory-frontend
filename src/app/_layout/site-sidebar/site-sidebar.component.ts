import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-sidebar',
  templateUrl: './site-sidebar.component.html',
  styleUrls: ['./site-sidebar.component.css']
})
export class SiteSidebarComponent implements OnInit {
  title='Payroll';
  menuItems=[
    {
      name:'Dashboard',
      link:'/dashboard'
    },
    {
      name:'Inventory Items',
      link:'/items'
    },
    {
      name: 'Client',
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
      name: 'Unit',
      link: '/units'
    },
    {
      name: 'Category',
      link: '/categories'
    },
    {
      name: 'Location',
      link: '/locations'
    },
    {
      name: 'Stage',
      link: '/stage'
    },
    {
      name: 'Store',
      link: '/store'
    },
    {
      name:'Booking',
      link: '/bookings'
    }

]
  constructor() { }

  ngOnInit() {
  }

}
