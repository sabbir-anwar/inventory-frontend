import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 token=null;
  constructor(public router:Router) { 
 
    this.token=localStorage.getItem("token");
    if(this.token == null)
    {
          this.router.navigate(["login"])
        //sendhello request to validate login

    }    


  }

  ngOnInit() {
  }

}
