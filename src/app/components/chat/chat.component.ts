import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
/*En esta parte estamos utilizando el componente llamado chat para poder utilizar el javascript*/
export class ChatComponent implements OnInit {
  /*Aqui vamos a declarar las variables que vamos a utilizar*/
	mensaje:string="";
	elemento:any;
  uid='';
  chats;
//Por medio de un constructor hacemos referencia al componente service.ts
  constructor(public _ls:LoginService) {
    if(this._ls.user!="administrador"){
    /*Se hace un llamado a la función cargar mensajes que se encuentra en el ts llamado service que
    nos sirve para cargar los mensajes*/
     this._ls.cargarMensajes().subscribe( ()=>{
        console.log("Mensajes cargados....");
        setTimeout( ()=>this.elemento.scrollTop=this.elemento.scrollHeight, 50);
      });
    }else if(this._ls.user="administrador"){
      /*Se llama a la función cargarChats que esta en service para poder visualizar todo las personas
      que se han logeado y dejado un mensaje*/
      this.chats=this._ls.cargarChats().subscribe( ()=>{
        console.log("Chats cargados...");
        console.log(this.chats);
      });
    }
  }
  ngOnInit() {
    /*Estamos mostrando los mensajes en el div llamado app-mensajes*/
  	this.elemento = document.getElementById("app-mensajes");
  }
  enviar(){
  	if(this.mensaje.length == 0){
  		//SI NO HAY NADA ESCRITO EN EL INPUT
  		return;
  	}
    /*Envia el mensaje que se localiza en el input del html*/
    this._ls.agregarMensaje(this.mensaje);
    //limpia el input y la variable mensaje para que pueda escribir un nuevo mensaje
  	this.mensaje="";
  }
  enviarAdm(){
    if(this.mensaje.length == 0){
      return;
    }
    //Envia el mensaje junto con el uid (identificador propio de cada usuario) a la función agregarMensajeAdm
    this._ls.agregarMensajeAdm(this.mensaje,this.uid);
    this.mensaje="";
  }
  consultar(uid){
    this.uid=uid;
    /*Carga los mensajes y los envia a la función cargarMsjUid pero ahora personalizadamente,
    dependiendo de el usuario que se haya seleccionado*/
    this._ls.cargarMsjUid(this.uid).subscribe( ()=>{
        setTimeout( ()=>this.elemento.scrollTop=this.elemento.scrollHeight, 50);
      });
  }
}
