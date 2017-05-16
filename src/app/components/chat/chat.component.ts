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

  constructor(public _ls:LoginService) {
    this._ls.cargarMensajes()
        .subscribe( ()=>{
      console.log("Mensajes cargados....");
      setTimeout( ()=>this.elemento.scrollTop=this.elemento.scrollHeight, 50);
    })
  }

  ngOnInit() {
  	this.elemento = document.getElementById("app-mensajes");
  }

  enviar(){
  	if(this.mensaje.length == 0){
  		//SI NO HAY NADA ESCRITO EN EL INPUT
  		return;
  	}

  	// console.log("este mensaje se enviara: ",this.mensaje);
    this._ls.agregarMensaje(this.mensaje);
  	this.mensaje="";
  }

}
