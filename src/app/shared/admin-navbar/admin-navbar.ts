import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar {

  constructor(private router:Router){}

  logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

}
