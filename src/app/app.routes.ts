import { Routes } from '@angular/router';
import { Home } from './modules/landing/home/home';
import { Login } from './modules/auth/login/login';
import { Register } from './modules/auth/register/register';
import { Dashboard } from './modules/user/dashboard/dashboard';
import { Profile } from './modules/user/profile/profile';
import { CreateRequest } from './modules/user/create-request/create-request';
import { MyRequests } from './modules/user/my-requests/my-requests';
import { ResetPassword } from './modules/auth/reset-password/reset-password';
import { ForgotPassword } from './modules/auth/forgot-password/forgot-password';

export const routes: Routes = [
    {
        path:'', component: Home
    },

    {
    path: 'login', component: Login
  },

  {
    path: 'register', component: Register
  },

  {
    path:'user/dashboard', component: Dashboard
  },

  {
    path: 'user/profile', component: Profile
  },

  {
    path: 'user/create-request', component: CreateRequest
  },
  {
    path: 'user/requests', component: MyRequests
  },
  {
    path: 'admin/dashboard', loadComponent: () => import('./modules/admin/dashboard/dashboard').then(m => m.Dashboard)
  },

  {
  path: 'admin/requests', loadComponent: () => import('./modules/admin/requests/requests').then(m => m.Requests)
},
{
  path: 'admin/user-approvals',
  loadComponent: () =>
    import('./modules/admin/user-approvals/user-approvals')
    .then(m => m.UserApprovalsComponent)
},
{ 
  path: 'forgot-password', component: ForgotPassword 
},
{ 
  path: 'reset-password', component: ResetPassword 
}

];
