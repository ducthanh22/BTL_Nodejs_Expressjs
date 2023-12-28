import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService,LoginService } from 'src/app/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  informationToken:any

  constructor(private categoriesService: CategoriesService,private router: Router,private LoginService: LoginService ) { }

  ngOnInit() {
   
    this.informationToken= this.LoginService.decodeToken();
    this.logout();
  }

  logout(){

    if(this.informationToken.status!=1){
      localStorage.clear();
      this.router.navigate(['/client/Home'])
    }
  

  }
}
