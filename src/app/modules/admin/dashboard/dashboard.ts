import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgClass, NgIf],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {

  requests = signal<any[]>([]);
  pendingCount = signal(0);
  approvedCount = signal(0);
  totalRequests = signal(0);

  loading = signal(true);
  error = signal<string | null>(null);

  private routerSub?: Subscription;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navEnd = event as NavigationEnd;
        if (navEnd.urlAfterRedirects.includes('/admin/dashboard')) {
          this.loadRequests();
        }
      });

    this.loadRequests();
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
  }

  private loadRequests() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<any[]>("http://localhost:8888/api/admin/requests")
      .subscribe({
        next: (res) => {
          this.requests.set(res.slice(0, 5));
          this.totalRequests.set(res.length);
          this.pendingCount.set(res.filter(r => r.status === 'PENDING').length);
          this.approvedCount.set(res.filter(r => r.status === 'APPROVED').length);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.error.set('Unable to load dashboard data. Please try again.');
          this.loading.set(false);
        }
      });
  }

}