import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  user: any={};
  mensajes; 
  // comentarios: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase,
          public afAuth: AngularFireAuth) {
 
          //SE CHECA SI HAY UN USUARIO LOGEADO EN LOCALSTORAGE
          if( localStorage.getItem('user') ){
              // Usuario logeado
              //SE OBTIENE DE LOCALSTORAGE Y SE ALMACENA EN LA VARIABLE USER
              this.user = JSON.parse(localStorage.getItem('user'));
              //SE ESTABLECE LA RUTA EN LA CUAL ESTARAN GUARDADOS LOS MENSAJES DEL USUARIO
              this.mensajes = db.list('/chats/'+this.user.user.uid);
            }else{
              this.user = null;
            }
  }
  
  // AUTENTICACION CON GOOGLE
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider(),)
      .then(result=>{

        // var token = result.credential.accessToken;
       // The signed-in user info.
       // this.user = result;

       console.log(result);
       this.user=result;
       //UNA VEZ QUE EL USUARIO SE AUTENTICA Y SE OBTIENEN SUS DATOS SE ALMACENAN EN LOCALSTORAGE
       localStorage.setItem('user', JSON.stringify(result) );

      });  
  
   }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.afAuth.auth.signOut().then(function(){
      console.log("sign-out successful");
    });
  }

  agregarMensaje(text:string){
    let mensaje={
      nombre:  this.user.user.displayName,
      mensaje:text
    }

    // console.log(mensaje);
    this.mensajes.push(mensaje);
  }

  cargarMensajes(){
    this.mensajes = this.db.list('/chats/'+this.user.user.uid,{
      query: {
        orderByKey:true
      }
    });

    console.log(this.mensajes);
    return this.mensajes;
  }
}