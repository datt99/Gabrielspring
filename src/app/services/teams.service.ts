import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const url = 'http://localhost:9001/teams';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  constructor(private http: HttpClient) {
  }

  createTeam(team: Team) {
    return this.http.post<Team>(url, team).toPromise();
  }

  updateTeam(team: Team, id: number) {
    return this.http.put<Team>(url + '/' + id, team).toPromise();
  }

  deleteTeam(id: number) {
    return this.http.delete(url + '/' + id).toPromise();
  }

  getTeams() {
    return this.http.get<Team[]>(url).toPromise();
  }

}

export interface Team {
  id: number;
  name: string;
  championships: number;
}
