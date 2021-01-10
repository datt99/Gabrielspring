import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  formGroup: FormGroup;

  constructor(formBuilder: FormBuilder,
              private userService: UsersService,
              private snackBar: MatSnackBar,
              private router: Router) {
    this.formGroup = formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  showSnackBar(message, actionMessage) {
    this.snackBar.open(message, actionMessage, {
      duration: 2000,
    });
  }

  onLogin() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = this.formGroup.value;
    this.userService.signIn(value.email, value.password).then(
      response => {
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['../']);
      }
    ).catch((err) => {
      this.showSnackBar('Usuario y contraseña no coinciden', 'Ok');
    });
  }

}
