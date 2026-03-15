import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports:[NgIf],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user:any;

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){

    this.http.get("http://localhost:8888/api/user/profile")
    .subscribe({
      next:(res)=>{
        this.user = res;

        // Force Angular to refresh UI
        this.cd.detectChanges();
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }

}