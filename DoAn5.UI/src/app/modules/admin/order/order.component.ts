import { Component } from '@angular/core';
import { OrderService } from 'src/app/service';
import { Order_detailService } from 'src/app/service/Order_detail.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  loading:boolean=false;
  page:number=1;
  pageSize:number=10;
  keyword:string='';
  datas!:any[];
  dataTotalRecords!:number;
  totalPages!:number;
  totalPageArray:any[]=[];
  order:any;
  detail:any

  constructor(private OrderService:OrderService,private order_detail:Order_detailService){}

 
  ngOnInit() {
    this.loadData(); 
  }
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.OrderService.Search(keyword, this.page, this.pageSize).subscribe({
      next: (res) => {
        this.datas = res.rows;
        this.dataTotalRecords = res.count;
        this.totalPages = Math.ceil(res.count / this.pageSize);
        this.totalPageArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  
  Nextdata() {
    if (this.page < this.totalPages) {
      this.page = this.page + 1;
      this.loadData();
    }
  }
  Previousdata() {
    if (this.page > 0) {
      this.page = Math.max(1, this.page - 1);
      this.loadData();
    }
  }

  Setpage(setpage: number) {
    this.page = setpage
    this.loadData();
  }

  
  getbydetail(x:any){
    this.order_detail.getbyid(x).subscribe({
      next:(res)=>{
    this.detail=res;
    console.log(this.detail)
    this.getbyid(this.detail[0].Id_Order);
      }
    })
  }

  getbyid(x:any){
    this.OrderService.getbyid(x).subscribe({
      next:(res)=>{
    this.order=res;
      }
    })
  }
  // getTotalPrice(): number {
  //   let Carts = this.detail;
  //   let total: number = 0;
  //   Carts?.forEach((item: any) => {
  //     total += item.Price * item.Quantity;
  //   });
  //   return total;
  // }
  
}
