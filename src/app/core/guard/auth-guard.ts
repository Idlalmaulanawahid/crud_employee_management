import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private storageService: StorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = !!sessionStorage.getItem('isLoggedIn'); // Check if user is logged in

    if (isLoggedIn && state.url === '/login') {
      // If user is already logged in and tries to access login page, redirect to list-employee
      this.router.navigate(['/list-employee']);
      return false;
    }

    if (isLoggedIn) {
      return true; // Allow access to protected routes
    } else {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
  }
}