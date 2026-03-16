import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.html',
  imports: [FormsModule]
})
export class ResetPassword implements OnInit {

  password: string = '';
  token: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {

    this.token = this.route.snapshot.queryParamMap.get('token')!;

  }

  resetPassword() {

    this.http.post(
      "http://localhost:8080/api/auth/reset-password?token=" + this.token + "&password=" + this.password,
      {}
    ).subscribe({

      next: () => {
        alert("Password reset successful");
      },

      error: () => {
        alert("Invalid or expired token");
      }

    });

  }
}