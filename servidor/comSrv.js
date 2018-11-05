function ComSrv(){

	this.enviarRemitente=function(socket,mens,datos){
    	socket.emit(mens,datos);
 	}
 	this.enviarATodos=function(io,nombre,mens,datos){
   		io.sockets.in(nombre).emit(mens,datos);
 	}
 	this.enviarATodosMenosRemitente=function(socket,nombre,mens,datos){
   		socket.broadcast.to(nombre).emit(mens,datos)
 	};

	this.lanzarSocketSrv=function(io,juego){
		var cli=this;
 		io.on('connection',function(socket){ //este es el punto de entrada, cuando un cliente (un navegador Web) se conecte, se crea un socket (variable socket)
 			socket.on('crearPartida', function(usrid,nombrePartida) {
 				console.log('nueva partida: ',usrid,nombrePartida);
 				var usr=juego.usuarios[usrid];
 				var partidaId;
 				if (usr){
 					console.log("usuario "+usrid+" crea partida "+nombrePartida);
 					partidaId=usr.crearPartida(nombrePartida); 
 					socket.join(nombrePartida);
 					cli.enviarRemitente(socket,"partidaCreada",partidaId);
 				} 
 			});
 			socket.on('elegirPartida',function(usrid,nombrePartida){
 				var usr=juego.usuarios[usrid]; 
 				var partidaId;
 				if (usr){
 					partidaId=usr.eligePartida(nombrePartida);
 					if (partidaId<0){
 						console.log("usuario "+usrid+" NO se pudo unir a la partida "+nombrePartida);
 						cli.enviarRemitente(socket,"noUnido",partidaId);
 					}
 					else{
 						console.log("usuario "+usrid+" se une a la partida "+nombrePartida);
 						socket.join(nombrePartida);
 						//var mano=usr.obtenerCartasMano();
 						//var json={"partidaId":partidaId,"mano":mano};
 						cli.enviarRemitente(socket,"unidoAPartida",partidaId);
 						cli.enviarATodos(io,nombrePartida,"aJugar",partidaId);
 					}
 				}
 			});
 			socket.on('meToca',function(usrid,nombrePartida){
 				var usr=juego.usuarios[usrid];
 				if (usr){
 					cli.enviarRemitente(socket,"meToca",usr.meToca());
 				}
 			});
 			socket.on('obtenerCartasMano',function(usrid,nombrePartida){
 				var usr=juego.usuarios[usrid]; 
 				if(usr){
 					cli.enviarRemitente(socket,"mano",{"mano":usr.obtenerCartasMano(),"elixir":usr.elixir});
 				}
 				else{
 					console.log("usuario " + usrid + "no existe");
 				}
 			});
 			socket.on('obtenerCartasAtaque',function(usrid,nombrePartida){
 				var usr=juego.usuarios[usrid]; 
 				if(usr){
 					cli.enviarRemitente(socket,"cartasAtaque",{"ataque":usr.obtenerCartasAtaque()});
 				}
 				else{
 					console.log("usuario " + usrid + "no existe");
 				}
 			});
 			socket.on('jugarCarta', function(usrid,nombrePartida,nombreCarta) { 
				var usr=juego.usuarios[usrid]; 
				var carta;
				if (usr){ 
					carta=usr.obtenerCartaMano(nombreCarta);
					usr.jugarCarta(carta);
					if(carta.posicion=="ataque"){
						console.log("usuario "+usrid+" juega la carta con coste: "+carta.coste);
						var json={"usrid":usrid,"carta":carta,"elixir":usr.elixir};
						cli.enviarATodos(io,nombrePartida,"juegaCarta",json);
			 		}
					else{
						console.log("usuario "+usrid+" NO pudo jugar la carta con coste: "+carta.coste);
						//sirve para enviar mensajes al cliente
						cli.enviarRemitente(socket,"noJugada",carta);
			 		}
				} 
 			});
 			socket.on('pasarTurno', function(usrid, nombrePartida) {
               var usr = juego.usuarios[usrid];
               if (usr) {
                   usr.pasarTurno();
                   console.log(usr.nombre + " ha pasado el turno");
                   //io.sockets.in(nombrePartida).emit("pasaTurno", usrid);
                   cli.enviarRemitente(socket,"pasaTurno",usr.meToca());
                   cli.enviarATodosMenosRemitente(socket,nombrePartida,"meToca",usr.rivalTeToca());
                   //socket.broadcast.to(nombrePartida).emit("recibeTurno");
               // } else {
               //     console.log("usuario " + usrid + "NO puede pasar turno porque no existe");
               //     socket.emit("noExiste", usrid);
               }
           });
 			socket.on('obtenerDatosRival',function(usrid,nombrePartida){
 				var usr = juego.usuarios[usrid];
                if (usr) {
                	cli.enviarRemitente(socket,"datosRival",usr.obtenerDatosRival());
                }
			});
			socket.on('atacar',function(usrid,nombrePartida,idCarta1,idCarta2){
 				var usr = juego.usuarios[usrid];
                if (usr) {
                	var json=usr.ataqueConNombre(idCarta1,idCarta2);
                	cli.enviarATodos(io,nombrePartida,"respuestaAtaque",json);
                }
			});
			socket.on('atacarRival',function(usrid,nombrePartida,idCarta1){
 				var usr = juego.usuarios[usrid];
                if (usr) {
                	var json=usr.ataqueRivalConNombre(idCarta1);
                	cli.enviarATodos(io,nombrePartida,"respuestaAtaqueRival",json);
                }
			});

 		});
 	};
 }

 module.exports.ComSrv=ComSrv;