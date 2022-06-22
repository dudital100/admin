import { Component, OnInit } from '@angular/core';
import { AuthCheckService } from 'src/app/services/auth-check.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthCheckService) { }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
  }
  
  isLogged() {
    return this.authService.isLoggedIn();
  }
}
