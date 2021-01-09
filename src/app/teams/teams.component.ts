import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Team, TeamsService} from '../services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  selectedTeam: Team;
  teams: Team[];
  displayedColumns: string[] = ['options', 'name', 'championships'];
  dataSource = new MatTableDataSource(this.teams);
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  formGroup: FormGroup;

  constructor(
    private teamsService: TeamsService,
    formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {
    this.formGroup = formBuilder.group({
      name: ['', [Validators.required]],
      championships: [0, [Validators.min(0), Validators.required]]
    });
  }

  fillTable() {
    this.teamsService.getTeams().then(
      teams => {
        this.teams = teams;
        this.dataSource = new MatTableDataSource<Team>(teams);
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

    this.teamsService.updateTeam({name: value.name, championships: +value.championships, id: 0}, this.selectedTeam.id).then(
      response => {
        this.fillTable();
        this.selectedTeam = null;
        this.formGroup.reset();
        this.showSnackBar('Equipo Modificado', 'Gracias');
      }
    ).catch(err => {
      this.showSnackBar('Algo ha salido mal', 'Entendido');
    });
  }

  onSaveUser() {
    if (this.selectedTeam) {
      this.updateUser();
      return;
    }

    if (this.formGroup.invalid) {
      return;
    }

    const value = this.formGroup.value;
    this.teamsService.createTeam({name: value.name, championships: +value.championships, id: 0}).then(
      response => {
        this.teams.push(response);
        this.dataSource = new MatTableDataSource<Team>(this.teams);
        this.dataSource.sort = this.sort;
        this.formGroup.reset();
        this.showSnackBar('Equipo Creado', 'Gracias');
      }
    ).catch(err => {
      this.showSnackBar('Algo ha salido mal', 'Entendido');
    });
  }

  onEdit(element: Team) {
    this.selectedTeam = element;
    this.formGroup.get('name').setValue(element.name);
    this.formGroup.get('championships').setValue(element.championships);
  }

  onDelete(element: Team) {
    this.teamsService.deleteTeam(element.id).then(
      () => {
        this.fillTable();
      }
    );
  }
}
