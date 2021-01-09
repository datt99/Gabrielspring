import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../users/users.component';

const url = 'http://localhost:9001/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  public createUser(user: User) {
    return this.http.post<User>(url, user).toPromise();
  }

  public updateUser(user: User, id: number) {
    return this.http.put<User>(url + '/' + id, user).toPromise();
  }

  public deleteUser(id: number) {
    return this.http.delete(url + '/' + id).toPromise();
  }

  public getUsers() {
    return this.http.get<User[]>(url).toPromise();
  }

}
