import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginService {
  user: any;
  mensajes;
  chats;
  //ALMACENA LAS CONVERSACIONES CON LOS DIFERENTES USUARIOS

  constructor(public db: AngularFireDatabase,
          public afAuth: AngularFireAuth) {

          //SE CHECA SI HAY UN USUARIO LOGEADO EN LOCALSTORAGE
          if( localStorage.getItem('user')){
              //MIENTRAS SEA DIFERENTE DE ADMINISTRADOR
              if(localStorage.getItem('user')!='administrador'){
              //SE OBTIENE DE LOCALSTORAGE Y SE ALMACENA EN LA VARIABLE USER
              this.user = JSON.parse(localStorage.getItem('user'));
              //SE ESTABLECE LA RUTA EN LA CUAL ESTARAN GUARDADOS LOS MENSAJES DEL USUARIO
              this.mensajes = db.list('/chats/'+this.user.uid);
              }else{
                this.user = localStorage.getItem('user');
              }
            }else{
              this.user = null;
            }

            console.log(this.user);
  }

  // AUTENTICACION CON GOOGLE
  login() {
    /*con esta linea de codigo estamos indicando que nos aparezca en un popUp la ventana en la
    cual podremos hacer el logeo con GOOGLE*/
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider(),)
      .then(result=>{
        /*con esta linea de codigo estamos indicando que cuando un usuario ya haya registrado
        una visita al sitio, pueda guardarse su nombre de usuaurio y su key para poder mostrar
        el chat que ha tenido*/
        this.db.list('/usuarios').update(result.user.uid,{
          uid:result.user.uid,
          nombre:result.user.displayName
        });
       this.user=result;
       //UNA VEZ QUE EL USUARIO SE AUTENTICA Y SE OBTIENEN SUS DATOS SE ALMACENAN EN LOCALSTORAGE
       localStorage.setItem('user', JSON.stringify(result) );

      });

   }
/*función del boton del logout*/
  logout() {
    /*Aqui estamos indicando que por medio de la variable localStorage y la propiedad removeItem
    lo que contenga user, en este caso el nombre del usuario, pasara a null*/
    localStorage.removeItem('user');
    this.user = null;
    /*con la funcion signOut estamos cerrando la sesión del usuario y nos mandara un mensaje en la
    consola que nos indique que la sesión fue cerrada exitosamente */
    this.mensajes="";
    this.afAuth.auth.signOut().then(function(){
      console.log("sign-out successful");
    });
  }

  agregarMensaje(text:string){
    /*con la variable mensajes que arriba inicializamos en el constructor e indicamos la ruta donde
    la información de esa variable estara almacenada en la base de datos, ahora estamos indicando la
    estructura que va a tener en los archivos JSON cada mensaje*/
    let mensaje={
      nombre:  this.user.displayName,
      mensaje:text
    }
    //Aqui estamos agregando el mensaje a la base de datos
    this.mensajes.push(mensaje);
  }

  agregarMensajeAdm(text:string, uid){
    /*En esta linea estamos indicando el formato que va a tener el documento JSON al momento de guardar
    el mensaje del administrador hacia el usurio*/
    let mensaje={
      nombre: 'administrador',
      mensaje:text
    }
    /*En esta linea de código estamos indicando la ruta donde se almacenara el mensaje y despues con el
    metodo push lo estamos almacenando en firebase (En este caso, estamos indicando la ruta donde el
    mensaje personalizado debe de ir ya que cada documento JSON es un usurio y le indicamos en que
    documento JSON se tiene que almacenar dependiendo del usuario al cuál esta contestando)*/
    this.db.list('/chats/'+uid).push(mensaje);
  }

  /*Con esta función estamos mostrando en pantalla los mensajes que el usuario ha enviado y de igual
  forma los mensajes que el administrador le ha enviado*/
  cargarMensajes(){
    console.log("desde el componente cargar mensajes:",this.user);
    this.mensajes = this.db.list('/chats/'+this.user.uid,{
      query: {
        //Se ordenan por clave para que los mensajes mas recientes aparezcan al ultimo
        orderByKey:true
      }
    });
    return this.mensajes;
  }
/*Con esta función estas mostrando individualmente cada mensaje que le ha enviado cada usuario al
administrador y de igual forma los que el administrador le ha enviado al usuario*/
  cargarMsjUid(uid){
    this.mensajes = this.db.list('/chats/'+uid,{
      query: {
        //Se ordenan por clave para que los mensajes mas recientes aparezcan al ultimo
        orderByKey:true
      }
    });
    return this.mensajes;
  }
/*Con esta funcion, estamos cargando todos las personas que han dejado mensajes para que los pueda
visualizar el administrador individualmente*/
  cargarChats(){
    this.chats = this.db.list('/usuarios/',{
      query:{
        orderByKey:true
      }
    });

    return this.chats;
  }
//Login del administrador
  loginAdministrador(){
    this.logout();
    this.user="administrador"
    localStorage.setItem('user',this.user);
  }
//Logout del administrador
  logoutAdministrador(){
    console.log("adm deslogueado");
    localStorage.removeItem('user');
    this.user=null;
  }

}
