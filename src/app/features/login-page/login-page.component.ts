import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../core/services/storage.service';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export default class LoginPageComponent {
  loginForm: FormGroup;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]]
    });

    // Check if user is already logged in
    const isLoggedIn = !!sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      this.router.navigate(['/list-employee']); // Redirect to list-employee if already logged in
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {
    const { username, password } = this.loginForm.value;
    // Validate credentials
    if (username && password) {
      this.storageService.setItem('isLoggedIn', 'true'); // Save login status
      this.router.navigate(['/list-employee']); // Navigate to the employee list page
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }
}
