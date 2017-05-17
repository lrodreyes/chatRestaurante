import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
	mensaje:string="";
	elemento:any;
  uid='';
  chats;

  constructor(public _ls:LoginService) {
    if(this._ls.user!="administrador"){

     this._ls.cargarMensajes().subscribe( ()=>{
        console.log("Mensajes cargados....");
        setTimeout( ()=>this.elemento.scrollTop=this.elemento.scrollHeight, 50);
      });
    }else if(this._ls.user="administrador"){
      this.chats=this._ls.cargarChats().subscribe( ()=>{
        console.log("Chats cargados...");
        console.log(this.chats);
      });

    }
  }

  ngOnInit() {
  	this.elemento = document.getElementById("app-mensajes");
  }

  enviar(){
  	if(this.mensaje.length == 0){
  		//SI NO HAY NADA ESCRITO EN EL INPUT
  		return;
  	}

    this._ls.agregarMensaje(this.mensaje);
  	this.mensaje="";
  }

  enviarAdm(){
    if(this.mensaje.length == 0){
      return;
    }

    this._ls.agregarMensajeAdm(this.mensaje,this.uid);
    this.mensaje="";
  }

  consultar(uid){
    // console.log("este es el uid del usuario "+uid);
    // this._ls.cargarMsjUid(uid);
    this.uid=uid;
    // console.log("uid enviado"+this.uid);
    this._ls.cargarMsjUid(this.uid).subscribe( ()=>{
        setTimeout( ()=>this.elemento.scrollTop=this.elemento.scrollHeight, 50);
      });
  }

}
