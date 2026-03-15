import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgIf,NgFor],
  standalone:true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  notifications:any[] = [];
  showDropdown = false;

  constructor(
    private http:HttpClient,
    private router:Router
  ){}

  ngOnInit(){
    this.loadNotifications();
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem("token");
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  toggleNotifications(){
    this.showDropdown = !this.showDropdown;
  }

  loadNotifications(){
    this.http.get<any>("http://localhost:8888/api/user/notifications")
      .subscribe({
        next:(res)=>{ 
          this.notifications = res;
        },
        error:(err)=>{
          console.log(err);
        }
      });
  }
}
