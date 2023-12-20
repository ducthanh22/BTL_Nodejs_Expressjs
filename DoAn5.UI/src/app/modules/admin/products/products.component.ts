import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(private ProductService:ProductService){}
  Dsproducts:any[]=[]

  ngOnInit() {
    this.LoadCategories();
   
    // this.FormCategories = this.fb.group({
    //   name: new FormControl('', Validators.required),
    // });
    
  }

  LoadCategories() {
    this.ProductService.getAll().subscribe((data) => {
      this.Dsproducts = data
    })
  }
}
