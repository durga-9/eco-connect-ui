// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { NgFor, NgClass, NgIf } from '@angular/common';

// @Component({
//   selector: 'app-requests',
//   standalone: true,
//   imports: [NgFor, NgClass,NgIf],
//   templateUrl: './requests.html',
//   styleUrls: ['./requests.css']
// })
// export class Requests implements OnInit {

//   requests:any[] = [];

//   constructor(private http:HttpClient){}

//   ngOnInit(){
//     this.loadRequests();

    
//   }

//   loadRequests(){

//     this.http.get<any>("http://localhost:8888/api/admin/requests")
//     .subscribe({
//       next:(res)=>{
//         this.requests = res;
//       },
//       error:(err)=>{
//         console.log(err);
//       }
//     });

//   }

//   approveRequest(id:number){

//     this.http.put(`http://localhost:8888/api/admin/requests/${id}/approve`,{})
//     .subscribe(()=>{
//       this.loadRequests();
//     });

//   }

//   rejectRequest(id:number){

//     this.http.put(`http://localhost:8888/api/admin/requests/${id}/reject`,{})
//     .subscribe(()=>{
//       this.loadRequests();
//     });

//   }

// }

import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './requests.html',
  styleUrls: ['./requests.css']
})
export class Requests implements OnInit {

  requests = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any[]>("http://localhost:8888/api/admin/requests")
      .subscribe({
        next: (data) => {
          this.requests.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.error.set('Failed to load requests. Please try again.');
          this.loading.set(false);
        }
      });

  }

  approveRequest(id:number){

    this.http.put(
      `http://localhost:8888/api/admin/requests/${id}/approve`,{}
    ).subscribe(()=>{
      this.loadRequests();
    });

  }

  rejectRequest(id:number){

    this.http.put(
      `http://localhost:8888/api/admin/requests/${id}/reject`,{}
    ).subscribe(()=>{
      this.loadRequests();
    });

  }

}
