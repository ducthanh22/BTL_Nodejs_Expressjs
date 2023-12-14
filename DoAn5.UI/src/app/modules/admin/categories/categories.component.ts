import { Component, ViewChild } from '@angular/core';
import { CategoriesDto } from 'src/app/model';

import { CategoriesService } from 'src/app/service';
// import { PrimeIcons, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';






@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  @ViewChild('dt') table!: Table;
  Dscategories: any[] = [];
  loading: boolean = true;
  page:number=1;
  pageSize:number=5;
  keyword!: string;
  Categories!: CategoriesDto[];
  datas: CategoriesDto[] = [];
  dataTotalRecords!: number;
  visible: boolean = false;
  FormCategories!: FormGroup;
  messageService: any;
  rowHover: any;
  totalPages!:number;
  totalPageArray:any[]=[]
  constructor(
    private categoriesService: CategoriesService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.LoadCategories();
    this.loadData();
   
    this.FormCategories = this.fb.group({
      name: new FormControl('', Validators.required),
    });
    
    
  }

  LoadCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.Dscategories = data
    })
  }

  loadData() {
    this.loading = true;
    this.categoriesService.Search(this.keyword, this.page, this.pageSize).subscribe({
      next: (res) => {
        this.datas = res.rows;
        this.dataTotalRecords = res.count;
        this.totalPages=res.count/this.pageSize
        this.totalPageArray = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  };
  Nextdata() {
    if (this.page < this.totalPages) { 
      this.page = this.page + 1;
      this.loadData();
    }
  }
  Previousdata() {
    if (this.page > 0) {
      this.page = Math.max(1, this.page - 1);
    }
  }
  Setpage(setpage:number){
    this.page=setpage
    this.loadData();
  }
  
  onSubmitSearch = () => {
    this.categoriesService.Search(this.keyword,this.page,this.pageSize).subscribe({
      next: (res) => {
        this.datas = res.rows;
        this.dataTotalRecords = res.count;
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  };

  SaveAdd() {
    if (this.FormCategories.valid) {
      const categiries = this.FormCategories.value;
      this.categoriesService.create(categiries).subscribe({
        next: (res) => {
          if (res != null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Thành Công',
              detail: 'Thêm thành Công !',
            });
            this.loadData();
            this.table.reset();
            this.FormCategories.reset();
          }
        },

        error: (e) => {
           e.errorMessage;
        },
      });
    }
  }
}
