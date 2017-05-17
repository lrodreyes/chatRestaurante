import { Component } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { LoginService } from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // comentarios: FirebaseListObservable<any[]>;

  constructor(public _ls:LoginService) { //AQUI SE INICIALIZA LA CLASE DEL SERVICIO
    // this.comentarios = db.list('/comentarios');
  }

  login(){
  	this._ls.login();
  }

  logout(){
  	this._ls.logout();
  }

  loginAdministrador(){
    this._ls.loginAdministrador();
  }

  logoutAdministrador(){
    this._ls.logoutAdministrador();
  }
}
