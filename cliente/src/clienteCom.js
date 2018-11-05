function ClienteCom(){
 	this.socket=undefined;
 	this.nombrePartida=undefined;
 	this.usrId=undefined;
 	this.cartaId=undefined;
 	this.ini=function(usrid){
 		this.socket=io.connect();
 		this.usrId=usrid;
 		this.lanzarSocketSrv();
	}
 	this.crearPartida=function(nombre){
 		this.nombrePartida=nombre;
 		this.socket.emit('crearPartida', this.usrId,nombre);
 		console.log("crear partida");
 	}

 	this.meToca = function(){ 
 		this.socket.emit('meToca',this.usrId,this.nombrePartida);
 	}

 	this.elegirPartida = function(nombre) {
 		this.nombrePartida=nombre;
       	this.socket.emit('elegirPartida', this.usrId, nombre);
   	}

 	this.obtenerCartasMano=function(){
 		this.socket.emit('obtenerCartasMano',this.usrId,this.nombrePartida);
 	}
 	this.obtenerCartasAtaque=function(){
 		this.socket.emit('obtenerCartasAtaque',this.usrId,this.nombrePartida);
 	}

 	/*this.comprobarMano=function(cartaId){
 		this.cartaId=cartaId
 		this.socket.emit('comprobarMano',this.usrId,this.nombrePartida,this.cartaId);
 	}*/

 	this.jugarCarta=function(nombreCarta){
 		//var carta=usr.obtenerCartaMano(cartaId);
 		this.socket.emit('jugarCarta',this.usrId,this.nombrePartida,nombreCarta);
 	}

 	this.pasarTurno = function() {
       this.socket.emit('pasarTurno', this.usrId, this.nombrePartida);
   	}
   	this.obtenerDatosRival=function(){
   		this.socket.emit('obtenerDatosRival',this.usrId,this.nombrePartida)
   	}
   	this.atacar=function(idCarta1,idCarta2){
   		this.socket.emit("atacar",this.usrId,this.nombrePartida,idCarta1,idCarta2);
   	}
   	this.atacarRival=function(idCarta1){
   		this.socket.emit("atacarRival",this.usrId,this.nombrePartida,idCarta1);
   	}
 	this.lanzarSocketSrv=function(){
 		var cli=this;
 		this.socket.on('connect', function() { 
 			console.log("Usuario conectado al servidor de WebSockets");
 		});
 		this.socket.on('partidaCreada', function(partidaId) { 
 			console.log("Usuario crea partida con id: "+partidaId);
 		});
 		this.socket.on('unidoAPartida', function(partidaId) { 
 			console.log("Usuario unido a partida id: "+partidaId);
 		});
 		this.socket.on('noUnido', function(partidaId) { 
 			console.log("El usuario no pudo unirse a la partida id: "+partidaId);
 		});

 		this.socket.on('aJugar',function(partidaId){
 			console.log("La partida "+partidaId+" esta en fase jugando");
 			cli.meToca();
 		})
 		this.socket.on('meToca',function(turno){
 			console.log("Mi turno esta a " + turno);
 			cli.obtenerCartasMano();
 			cli.obtenerDatosRival();
 			cli.obtenerCartasAtaque();
 		})

 		this.socket.on('mano', function(datos) { 
 			console.log(datos);
 		});
 		//this.socket.on('noJugadaNoMano', function(carta) { 
		//	console.log("El usuario no pudo jugar la carta porque no estaba en su mano");
		//});
		this.socket.on('noJugada', function(carta) { 
			console.log("El usuario no pudo jugar la carta con coste: "+carta.coste);
		});
		this.socket.on('juegaCarta', function(json) { 
			console.log("Usuario " + json.usrid + " juega la carta correctamente con coste: "+ json.carta.coste + " elixir: "+ json.elixir);
		});
 		this.socket.on('pasadoTurno', function(partidaId) { 
 			console.log("El usuario ha pasado el turno: ");
 		});
		this.socket.on('noExiste', function (id) {
           console.log("El usuario con id " + id + " no existe");
       	});
       	this.socket.on('pasaTurno', function(resultado) {
           console.log("El usuario tiene turno " + resultado);
       	});
       	//this.socket.on('recibeTurno', function(id) {
          // console.log("Tienes el turno ");
       	//})
		this.socket.on('datosRival',function(datos){
			console.log(datos);
			//usr.datosRival=datos;
		});
		this.socket.on('datosRival',function(datos){
			console.log(datos);
			//usr.datosRival=datos;
		});
		this.socket.on('respuestaAtaque',function(datos){
			console.log(datos);
			//cli.obtenerDatosRival();
			cli.meToca();
		})
		this.socket.on('respuestaAtaqueRival',function(datos){
			console.log(datos);
			cli.meToca();
		})
		this.socket.on('cartasAtaque',function(datos){
			console.log(datos);
		})



 	}
 }