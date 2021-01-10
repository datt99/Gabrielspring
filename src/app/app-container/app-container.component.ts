import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['./app-container.component.css']
})
export class AppContainerComponent implements OnInit {

  userData: { name: string, rol: string } = JSON.parse(sessionStorage.getItem('user'));

  constructor(private route: Router) {
  }

  ngOnInit() {
  }

  signOut() {
    sessionStorage.removeItem('user');
    this.route.navigate(['/login']);
  }
}
