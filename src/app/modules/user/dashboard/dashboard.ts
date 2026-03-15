import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {

  user:any;

  constructor(private http: HttpClient, private cd:ChangeDetectorRef){}

  ngOnInit(){

    this.http.get("http://localhost:8888/api/user/profile")
      .subscribe({
        next:(res)=>{
          this.user = res;

          this.cd.detectChanges();
        },
        error:(err)=>{
          console.log(err);
        }
      });

  }

}