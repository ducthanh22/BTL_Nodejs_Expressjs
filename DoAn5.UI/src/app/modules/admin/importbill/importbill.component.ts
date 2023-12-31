import { Component } from '@angular/core';
import { ImportBillService } from 'src/app/service/importbill.service';

@Component({
  selector: 'app-importbill',
  templateUrl: './importbill.component.html',
  styleUrls: ['./importbill.component.css']
})
export class ImportbillComponent {
  
  Dscategories: any[] = [];
  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  dataTotalRecords!: number;

  datas:any[]=[];
  totalPages!: number;
  totalPageArray: any[] = [];
  title: string = ''

  invoiceName: string = '';
  invoiceItems: any[] = [{ name: '', quantity: 0 }];
  constructor(
    private importbillSV: ImportBillService) {
  }

  ngOnInit() {
    // this.LoadCategories();
    this.loadData();
  }


  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.importbillSV.Search(keyword, this.page, this.pageSize).subscribe({
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

  addInvoiceItem() {
    this.invoiceItems.push({ name: '', quantity: 0 });
  }

  removeInvoiceItem(index: number) {
    this.invoiceItems.splice(index, 1);
  }

  saveInvoice() {
    // Perform save operation, e.g., send data to the server
    console.log('Invoice Name:', this.invoiceName);
    console.log('Invoice Items:', this.invoiceItems);
  }
}
