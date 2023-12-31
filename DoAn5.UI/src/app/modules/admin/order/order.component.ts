import { Component } from '@angular/core';
import { Detail_exportbillsDto, exportbillDto } from 'src/app/model';
import { OrderService } from 'src/app/service';
import { Order_detailService } from 'src/app/service/Order_detail.service';
import { ExportBillService } from 'src/app/service/exportbill.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  loading: boolean = false;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  datas!: any[];
  dataTotalRecords!: number;
  totalPages!: number;
  totalPageArray: any[] = [];
  order: any;
  detail: any;
  ExportBill!: exportbillDto;

  constructor(private OrderService: OrderService, private order_detail: Order_detailService,
    private ExportbillSv: ExportBillService) { }


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


  getbydetail(x: any) {
    this.order_detail.getbyid(x).subscribe({
      next: (res) => {
        this.detail = res;
        // console.log(this.detail)
        this.getbyid(this.detail[0].Id_Order);
      }
    })
  }

  getbyid(x: any) {
    this.OrderService.getbyid(x).subscribe({
      next: (res) => {
        this.order = res;
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

  CreateExportBill(x: any) {
    this.getbydetail(x);
    if (this.detail != null) {
      const Detail_exportbills: Detail_exportbillsDto[] = this.detail.map((item: any) => ({
        Id_product: item.Id_product,
        Idproduct: item.Id_product,
        Quantity: item.Quantity,
        Price: item.Price
      }));
      const data: exportbillDto = {
        Id_customer: this.order.id,
        Price: this.order.Price,
        Detail_exportbills: Detail_exportbills,
        id: null
      };
      this.ExportbillSv.create(data).subscribe({
        next: (res) => {
          if (res != null) {
            alert('Thêm hóa đơn bán thành công')
          }
        },
        error: (e) => {
          console.error(e);
        },
      });
    } else {
      console.warn('Giỏ hàng trống');
    }
  }

  Update(x:number, s:number ){
    this.CreateExportBill(x);
    this.getbyid(x);
    let data = this.order;
    data.status=s;
    this.OrderService.update(data).subscribe({
      next:(res)=>{
        if(res != null){
          this.loadData();
          alert('Đổi trạng thái thành công');
        }
      }
    });
  
  }
}
