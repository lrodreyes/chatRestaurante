import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  user: any;
  mensajes; 
  chats;//ALMACENA LAS CONVERSACIONES CON LOS DIFERENTES USUARIOS
  // comentarios: FirebaseListObservable<any[]>;

  constructor(public db: AngularFireDatabase,
          public afAuth: AngularFireAuth) {
 
          //SE CHECA SI HAY UN USUARIO LOGEADO EN LOCALSTORAGE
          if( localStorage.getItem('user')){

              if(localStorage.getItem('user')!='administrador'){//MIENTRAS SEA DIFERENTE DE ADMINISTRADOR
              //SE OBTIENE DE LOCALSTORAGE Y SE ALMACENA EN LA VARIABLE USER
              this.user = JSON.parse(localStorage.getItem('user'));
              //SE ESTABLECE LA RUTA EN LA CUAL ESTARAN GUARDADOS LOS MENSAJES DEL USUARIO
              this.mensajes = db.list('/chats/'+this.user.user.uid);
              }else{
                this.user = localStorage.getItem('user');
                //AQUI ESTABLECER LA OTRA RUTA
              }
            }else{
              this.user = null;
            }

            console.log(this.user);
  }
  
  // AUTENTICACION CON GOOGLE
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider(),)
      .then(result=>{

        this.db.list('/usuarios').update(result.user.uid,{
          uid:result.user.uid,
          nombre:result.user.displayName
        });
       // var token = result.credential.accessToken;
       // The signed-in user info.
       // this.user = result;

       // console.log(result);
       this.user=result;
       //UNA VEZ QUE EL USUARIO SE AUTENTICA Y SE OBTIENEN SUS DATOS SE ALMACENAN EN LOCALSTORAGE
       localStorage.setItem('user', JSON.stringify(result) );

      });  
  
   }

  logout() {
    localStorage.removeItem('user');
    this.user = null;
    this.mensajes="";
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

  agregarMensajeAdm(text:string, uid){
    let mensaje={
      nombre: 'administrador',
      mensaje:text
    }

   this.db.list('/chats/'+uid).push(mensaje);
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

  cargarMsjUid(uid){
    this.mensajes = this.db.list('/chats/'+uid,{
      query: {
        orderByKey:true
      }
    });
    console.log(this.mensajes);
    return this.mensajes;
  }

  cargarChats(){
    this.chats = this.db.list('/usuarios/',{
      query:{
        orderByKey:true
      }
    });

    return this.chats;
  }

  loginAdministrador(){
    this.logout();
    this.user="administrador"
    localStorage.setItem('user',this.user);
    console.log(this.user);
  }

  logoutAdministrador(){
    console.log("adm deslogueado");
    localStorage.removeItem('user');
    this.user=null;
    console.log(this.user);
  }

}


