import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private userService: UserServiceService,
    private router: Router,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {}
  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        const response = await this.userService.login(email, password);
        if (response.email) {
          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/restaurants');
        }
        console.log(response);
      } catch (error: any) {
        this.toast.error('Wrong Credentials!' , { duration: 2000 });
      }
    } else {
      this.toast.error('Form invalid!' , { duration: 2000 });
    }
  }
}
