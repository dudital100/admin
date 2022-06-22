import { Component, OnInit } from '@angular/core';
import { AuthCheckService } from '../../services/auth-check.service';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthCheckService) { 

  }

  ngOnInit(): void {
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }

}
