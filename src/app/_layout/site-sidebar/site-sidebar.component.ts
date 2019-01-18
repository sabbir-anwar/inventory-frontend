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
     }
]
  constructor() { }

  ngOnInit() {
  }

}
