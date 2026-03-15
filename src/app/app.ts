import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Navbar } from './shared/navbar/navbar';
import { AdminNavbar } from './shared/admin-navbar/admin-navbar';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, Navbar, AdminNavbar, NgIf], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  

  getRole(): string | null {
    return localStorage.getItem('role');
  }
} 
