import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-request.html',
  styleUrls: ['./create-request.css']
})
export class CreateRequest {

  category = '';
  itemName = '';
  description = '';
  quantity = 1;
  estimatedWeight = 1;
  pickupAddress = '';
  city = '';
  pincode = '';
  preferredDate = '';
  preferredTimeSlot = '';

  selectedFile: File | null = null;

  constructor(private http: HttpClient){}

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

  submitRequest(){

    const requestData = {
      category: this.category,
      itemName: this.itemName,
      description: this.description,
      quantity: this.quantity,
      estimatedWeight: this.estimatedWeight,
      pickupAddress: this.pickupAddress,
      city: this.city,
      pincode: this.pincode,
      preferredDate: this.preferredDate,
      preferredTimeSlot: this.preferredTimeSlot
    };

    const formData = new FormData();

    formData.append(
      "request",
      new Blob([JSON.stringify(requestData)], { type: "application/json" })
    );

    if(this.selectedFile){
      formData.append("image", this.selectedFile);
    }

    this.http.post("http://localhost:8888/api/user/requests", formData)
    .subscribe({
      next:(res)=>{
        console.log("SUCCESS", res);
        alert("Request submitted successfully");
      },
      error:(err)=>{
        console.log("BACKEND ERROR", err.error);
        alert("Request submission failed. Check console.");
      }
    });

  }

}