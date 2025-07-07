import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class Login implements OnInit {
  loginForm!: FormGroup<{
    loginName: FormControl<string>;
    password: FormControl<string>;
    pin: FormControl<string>;
    deviceId: FormControl<string>;
    token: FormControl<string>;
    dob: FormControl<string>;
    zipCode: FormControl<string>;
  }>;

   step = 1;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notify: NotificationService,
    private cdr: ChangeDetectorRef,
    private loadingService :LoadingService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      loginName: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      password: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8)] }),
      pin: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)] }),
      deviceId: this.fb.control('', { nonNullable: true }),
      token: this.fb.control('', { nonNullable: true }),
      dob: this.fb.control('', { nonNullable: true }),
      zipCode: this.fb.control('', { nonNullable: true }),
    });

    if (this.authService.isAuthenticated()) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigate([returnUrl]);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

 
 onSubmit() {
    if (this.submitting) return;
    
    if (this.step === 1) {
      if (this.f.loginName.invalid || this.f.password.invalid) {
        this.notify.show('Please enter login name and password', 'warning');
        return;
      }
      this.submitting = true;
      this.login();
    }

    if (this.step === 2) {
      if (this.f.pin.invalid) {
        this.notify.show('Please enter PIN', 'warning');
        return;
      }
      this.submitting = true;
      this.submitPin();
    }
  }


login() {
    const payload = this.loginForm.getRawValue();
    this.authService.login(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.entity) {
          debugger;
          this.authService.tempToken = res.entity;
          this.notify.show(res.message, 'success');
            Promise.resolve().then(() => {
          this.step = 2;
          this.cdr.detectChanges();  // ✅ Forces Angular to re-check view
        });
        } else {
          this.notify.show(res.message, 'warning');
        }
        this.submitting = false;
      },
      error: (err) => {
        this.notify.show(this.extractErrorMessage(err), 'error');
        this.submitting = false;
      }
    });
  }

  submitPin() {
    const payload = {
      ...this.loginForm.getRawValue(),
      token: this.authService.tempToken
    };

    this.authService.verifyPin(payload).subscribe({
      next: (res) => {
        if (res.statusCode === 200 && res.entity) {
          this.authService.setJwtToken(res.entity);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
          this.loadingService.setFullPageLoading(true);
        } else {
          this.notify.show(res.message, 'warning');
        }
        this.submitting = false;
      },
      error: (err) => {
        this.notify.show(this.extractErrorMessage(err), 'error');
        this.submitting = false;
      }
    });
  }

  private extractErrorMessage(err: any): string {
    if (err.status === 0) return 'Network error: Server unreachable';
    if (err.status >= 500) return 'Server error: Please try again later';
    if (err.error?.message) return err.error.message;
    if (typeof err === 'string') return err;
    return 'Something went wrong';
  }
}
