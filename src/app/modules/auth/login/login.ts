import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email = '';
  password = '';

  constructor(private http: HttpClient,
    private router: Router) { }

  login() {

    const data = {
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8888/api/auth/login', data)
      .subscribe((res: any) => {
        console.log("login working...");

        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        if (res.role === "ADMIN") {
          this.router.navigate(['/admin/dashboard']);
        }
        else if (res.role === "USER") {
          this.router.navigate(['/user/dashboard']);
        }
        else if (res.role === "WORKER") {
          this.router.navigate(['/worker/dashboard']);
        }


        alert("Login successful!");



      }, error => {

        alert("Login failed!");

      });

  }

}