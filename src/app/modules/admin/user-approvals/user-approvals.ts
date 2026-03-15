import { Component, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-approvals',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './user-approvals.html',
  styleUrls: ['./user-approvals.css']
})
export class UserApprovalsComponent implements OnInit {

  users = signal<any[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private http:HttpClient){}

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(){
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any[]>("http://localhost:8888/api/admin/users/pending")
      .subscribe({
        next:(res)=>{
          this.users.set(res);
          this.loading.set(false);
        },
        error:(err)=>{
          console.log(err);
          this.error.set('Failed to load pending users. Please try again.');
          this.loading.set(false);
        }
      });

  }

  approveUser(id:number){

    this.http.put(
      `http://localhost:8888/api/admin/users/${id}/approve`,{}
    ).subscribe(()=>{
      this.loadUsers();
    });

  }

  rejectUser(id:number){

    const reason = prompt("Enter rejection reason");

    this.http.put(
      `http://localhost:8888/api/admin/users/${id}/reject`,
      {reason:reason}
    ).subscribe(()=>{
      this.loadUsers();
    });

  }

}