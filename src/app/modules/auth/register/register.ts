import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  fullName = '';
  email = '';
  password = '';
  phone = '';
  address = '';
  city = '';
  pincode = '';

  constructor(private http: HttpClient,
              private router: Router) {}

  register(){

    const data = {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      address: this.address,
      city: this.city,
      pincode: this.pincode
    };

    console.log("Registration.Ok");
    
    this.http.post('http://localhost:8888/api/auth/register', data)
.subscribe({
  next:(res)=>{
    console.log("REGISTER SUCCESS:", res);
    alert("Registration successful");
  },
  error:(err)=>{
    console.log("FULL ERROR OBJECT:", err);
    console.log("BACKEND MESSAGE:", err.error);
    alert("Registration failed. Check console.");
  }
});

  }

}