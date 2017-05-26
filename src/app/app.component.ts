import { Component } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _ls:LoginService) { //AQUI SE INICIALIZA LA CLASE DEL SERVICIO
  }

  login(){
    //Se hace el llamado a la función login que se encuentra en el archivo service
  	this._ls.login();
  }

  logout(){
    //Se hace el llamado a la funcion logout que se encuentra en el archivo service
  	this._ls.logout();
  }

  loginAdministrador(){
    //Se hace el llamado a la funcion loginAdministrador que se encuentra en el archivo service
    this._ls.loginAdministrador();
  }

  logoutAdministrador(){
    //se hace el llamado a la funcion logoutAdministrador que se encuentra en el archivo service
    this._ls.logoutAdministrador();
  }
}
