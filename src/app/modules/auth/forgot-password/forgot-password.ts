import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.html',
  imports: [FormsModule]
})
export class ForgotPassword {

  email: string = '';

  constructor(private http: HttpClient) {}

  sendResetLink() {

    this.http.post(
      "http://localhost:8080/api/auth/forgot-password?email=" + this.email,
      {}
    ).subscribe({

      next: () => {
        alert("Reset link sent to your email");
      },

      error: () => {
        alert("Error sending reset email");
      }

    });

  }
}