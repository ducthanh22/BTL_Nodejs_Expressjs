import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/service';
import { ProducesService } from 'src/app/service/produces.service';
import { ProductService } from 'src/app/service/product.service';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  public Editor = ClassicEditor;

  loading: boolean = true;
  page: number = 1;
  pageSize: number = 10;
  keyword: string = '';
  datas: any[] = [];
  dataTotalRecords!: number;
  Dscategories: any[] = [];
  totalPageArray: any[] = [];
  totalPages!: number;
  FormProduts!: FormGroup;
  Dsproduces: any[] = [];
  urlFist!: string;
  selectedFile!: File | null;
  formData: FormData = new FormData();
  getid!: number
  // file:any
  constructor(private ProductService: ProductService, private fb: FormBuilder,
    private categoriesService: CategoriesService,
    private ProducesService: ProducesService) { }

  ngOnInit() {
    this.LoadCategories();
    this.LoadProduces();
    this.loadData();
    this.FormProduts = this.fb.group({
      Id: [''],

      Name: ['', Validators.required],
      Idcategories: ['', Validators.required],
      Idproduces: ['', Validators.required],
      Describe: ['', Validators.required],
      Image: [''],
    });

  }


  LoadCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.Dscategories = data
    })
  }
  LoadProduces() {
    this.ProducesService.getAll().subscribe((data) => {
      this.Dsproduces = data
    })
  }
  edit(x: any) {
    this.FormProduts.controls['Id'].setValue(x.id);
    this.FormProduts.controls['Name'].setValue(x.Name);
    this.FormProduts.controls['Idcategories'].setValue(x.Idcategories);
    this.FormProduts.controls['Idproduces'].setValue(x.Idproduces);
    this.FormProduts.controls['Describe'].setValue(x.Describe);

  }
  onSubmitSearch() {
    this.loadData(this.keyword);
  };
  // load dữ liệu table
  loadData(keyword: string = '') {
    this.loading = true;
    this.ProductService.Search(keyword, this.page, this.pageSize).subscribe({
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
  onFileSelected(event: any): void {
    const fileInput: HTMLInputElement = event.target;
    this.selectedFile = fileInput.files?.[0] || null;
  }

  SaveAdd() {
    if (this.selectedFile) {
      const updatedData = this.FormProduts.value;
      this.formData = new FormData();
      this.formData.append('Name', updatedData.Name);
      this.formData.append('Idcategories', updatedData.Idcategories);
      this.formData.append('Idproduces', updatedData.Idproduces);
      this.formData.append('Describe', updatedData.Describe);
      this.formData.append('Image', this.selectedFile || '');
      this.ProductService.create(this.formData).subscribe({
        next: (res) => {
          if (res != null) {
            this.getid = res.products.id
            console.log(this.getid)
            this.FormProduts.reset();
            this.loadData();
            alert('Lưu thành công')
          }
        },
        error: (e) => {
          console.error('Error:', e);
        },
      });
    }

  }

  Update() {
    if (this.selectedFile) {
      const updatedData = this.FormProduts.value;
      this.formData = new FormData();
      this.formData.append('Id', updatedData.Id);
      this.formData.append('Name', updatedData.Name);
      this.formData.append('Idcategories', updatedData.Idcategories);
      this.formData.append('Idproduces', updatedData.Idproduces);
      this.formData.append('Describe', updatedData.Describe);
      this.formData.append('Image', this.selectedFile || '');
      this.ProductService.update(this.formData).subscribe({
        next: (res) => {
          if (res != null) {
            this.FormProduts.reset();
            this.loadData();
            alert('Sửa thành công')
          }
        },
        error: (e) => {
          console.error('Error:', e);
        },
      });
    }
  }
  Delete(id:number){
    if(confirm('Bạn có muốn xóa không?')){
    this.ProductService.delete(id).subscribe({
      next:(res)=>{
        if (res != null) {
          this.loadData();
          alert('Xóa thành công')
        }
      }
    })
  }}

}
