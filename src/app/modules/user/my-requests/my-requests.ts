import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'app-my-requests',
  standalone: true,
  imports: [NgFor, NgIf, NgClass],
  templateUrl: './my-requests.html',
  styleUrls: ['./my-requests.css']
})
export class MyRequests implements OnInit {

  requests: any[] = [];

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(){
    this.loadRequests();
  }

  loadRequests(){

    this.http.get<any>("http://localhost:8888/api/user/requests")
      .subscribe({
        next: (res) => {

          console.log("Requests:", res);

          if(res.content){
            this.requests = res.content;
          }else{
            this.requests = res;
          }

          // 🔥 Force Angular to update UI
          this.cd.detectChanges();
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

}