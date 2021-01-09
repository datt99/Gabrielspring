import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../services/users.service';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  selectedUser: User;
  users: User[];
  displayedColumns: string[] = ['options', 'name', 'email'];
  dataSource = new MatTableDataSource(this.users);
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  formGroup: FormGroup;

  constructor(
    private usersService: UsersService,
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.formGroup = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', [Validators.minLength(1), Validators.required]],
      password: ['', [Validators.minLength(1), Validators.required]]
    });
  }

  fillTable() {
    this.usersService.getUsers().then(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.sort = this.sort;
      }
    );
  }

  ngOnInit() {
    this.fillTable();
  }

  showSnackBar(message, actionMessage) {
    this.snackBar.open(message, actionMessage, {
      duration: 2000,
    });
  }

  updateUser() {
    if (this.formGroup.invalid) {
      return;
    }
    const value = this.formGroup.value;

    this.usersService.updateUser({name: value.name, email: value.email, id: 0}, this.selectedUser.id).then(
      response => {
        this.fillTable();
        this.selectedUser = null;
        this.formGroup.reset();
        this.showSnackBar('Usuario Modificado', 'Gracias');
      }
    ).catch(err => {
      this.showSnackBar('Usuario Con Email Repetido', 'Entendido');
    });
  }

  onSaveUser() {
    if (this.selectedUser) {
      this.formGroup.get('password').setValue('password');
      this.updateUser();
      return;
    }

    if (this.formGroup.invalid) {
      return;
    }

    const value = this.formGroup.value;
    this.usersService.createUser({name: value.name, email: value.email, id: 0}).then(
      response => {
        this.users.push(response);
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.sort = this.sort;
        this.formGroup.reset();
        this.showSnackBar('Usuario Creado', 'Gracias');
      }
    ).catch(err => {
      this.showSnackBar('Usuario Con Email Repetido', 'Entendido');
    });
  }

  onEdit(element: User) {
    this.selectedUser = element;
    this.formGroup.get('name').setValue(element.name);
    this.formGroup.get('email').setValue(element.email);
  }

  onDelete(element: User) {
    this.usersService.deleteUser(element.id).then(
      () => {
        this.fillTable();
      }
    );
  }
}
