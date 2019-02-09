import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }
  displaySearch=false;

  logout()
  {
    localStorage.removeItem("token");
    this.router.navigate(["login"]); 
  }

}
