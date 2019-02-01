import { Component, OnInit,Input,Output,EventEmitter} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {getHost} from '../../config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  @Input() payhead:any;
  @Output() messageEvent=new EventEmitter<boolean>();
  units=null;
  inventoryitems=null;
  item={
    receiptNumber:"",
    sellerName:"",
    sellerAddress:"",
    purchaseDate:"",
    delivaryDate:"",
    unit_id:"",
    quantity:"",
    item_id:""
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
  lock = false;
  submit(){
    this.lock = true;
    if(this.item.receiptNumber.length == 0||this.item.sellerName.length == 0|| this.item.sellerAddress.length==0 ||this.item.purchaseDate.length == 0 ||
      this.item.delivaryDate.length == 0||this.item.unit_id.length == 0||this.item.quantity.length == 0||this.item.item_id.length == 0) 
    {
      return;
    }
    
      console.log(this.item);  
      let token=localStorage.getItem("token");
      let headers= new HttpHeaders().append("Authorization","Bearer "+token);
      
      this.http.post(getHost()+"/api/purchases",this.item,{headers}).subscribe((res)=>{
        this.sendMessageToParent(this);
        this.init();      
        // this.lock = false;
        
     },(error)=>{
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

  init(){
    this.item={
      receiptNumber:"",
      sellerName:"",
      sellerAddress:"",
      purchaseDate:"",
      delivaryDate:"",
      unit_id:"",
      quantity:"",
      item_id:""
    }
    let token=localStorage.getItem("token");
    let headers= new HttpHeaders().append("Authorization","Bearer "+token);

    this.http.get(getHost()+"/api/units",{headers}).subscribe((res)=>{
      this.units=res;
      console.log(this.item);  
    },(err)=>{
    console.log(err);  
    })
    this.http.get(getHost()+"/api/items",{headers}).subscribe((res)=>{
      this.inventoryitems=res;
      console.log(this.item);  
    },(err)=>{
    console.log(err);  
    })
  }

}
