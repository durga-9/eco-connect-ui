import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule],
  standalone:true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
