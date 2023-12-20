import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  Dscategories:any[]=[];
  informationToken:any
 
  constructor(private categoriesService: CategoriesService,private router: Router,private LoginService: LoginService ) { }

  ngOnInit() {
    this.LoadCategories()
    this.activeNav();
    this.informationToken= this.LoginService.decodeToken();
  }

  activeNav() {
    const current =  window.location.pathname;
    const links = document.querySelectorAll("li a.nav-link");
    // let hrefs: any[] = [];
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (href == current) {
        link.classList.add("active");
      }
      else {
        link.classList.remove("active");
      }
    });
  }
  LoadCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.Dscategories = data
    })
  }
  getToken(){
    const token= localStorage.getItem('Token')
    return token
  }
  logout(){
    localStorage.clear();
  this.router.navigate(['/client/Home'])

  }
  
 


}