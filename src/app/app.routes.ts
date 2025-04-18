import { Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login-page/login-page.component').then(m => m.default)
    },
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: 'add-employee',
                loadComponent: () => import('./features/add-employee-page/add-employee-page.component').then(m => m.default)
            },
            {
                path: 'list-employee',
                loadComponent: () => import('./features/employee-list-page/employee-list-page.component').then(m => m.default)
            },
            {
                path: 'detail-employee/:id',
                loadComponent: () => import('./features/employee-detail-page/employee-detail-page.component').then(m => m.default)
            },
            {
                path: 'edit-employee/:id',
                loadComponent: () => import('./features/employee-edit/employee-edit.component').then(m => m.default)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];