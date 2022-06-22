import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
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
      const { name, email, password } = this.loginForm.value;
      try {
        const response = await this.userService.register(name, email, password);
        if (response) {
          console.log(response);
          this.router.navigateByUrl('/login');
          this.toast.success(
            `Hello ${name}, Your registration has been succeeded! please log in :)`,
            { duration: 5000 }
          );
        }
      } catch (error: any) {
        console.log(error);
        this.router.navigateByUrl('/login');
        this.toast.warning(`You already have an account please Sign in :)`, {
          duration: 5000,
        });
      }
    } else {
      console.log('Form invalid');
      this.toast.error('Form invalid!', {
        duration: 2000,
      });
    }
  }
}
