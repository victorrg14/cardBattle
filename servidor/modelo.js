
function Juego(){
	this.cartas=[];
	this.usuarios=[];
	this.partidas=[];	
	this.agregarCarta=function(carta){
		this.cartas.push(carta);
	}
	this.agregarUsuario=function(usuario){
		usuario.mazo=this.cartas;
		usuario.juego=this;
		this.usuarios.push(usuario);
	}
	this.crearColeccion=function(){
		//10 ataque 5 coste 3 vida 5
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("Dragon"+i,5,5,3));
		}
		//10 ataque 3 coste 5 vida 10
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("Guerrero"+i,10,3,5));
		}
		//10 ataque 2 coste 1 vida 2
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("Esbirro"+i,2,2,1));
		}
	}
	this.agregarPartida= function (partida){
		this.partidas.push(partida); 
	}
	this.crearPartida=function(nombre,usuario){
		var partida=new Partida(nombre);
		this.agregarPartida(partida);
		partida.asignarUsuario(usuario);
	}
	this.asignarPartida=function(nombre,usuario){
		for (var i=0;i<this.partidas.length;i++){
			if (this.partidas[i].nombre==nombre){
				this.partidas[i].asignarUsuario(usuario);
			}
		}
	}

	this.crearColeccion();	
}

function Partida(nombre){
	this.nombre=nombre;
	this.tablero=undefined;
	this.crearTablero=function(){
		this.tablero=new Tablero();
	}
	this.asignarUsuario=function(usuario){
		usuario.asignarPartida(this);
		this.tablero.asignarUsuario(usuario);
	}
	this.crearTablero();
}

function Tablero(){
	this.zonas=[];
	this.agregarZona=function(zona){
		this.zonas.push(zona);
	}
	this.crearZonas=function(){
		this.agregarZona(new Zona("arriba"));
		this.agregarZona(new Zona("abajo"));
	}
	this.asignarUsuario=function(usuario){
		for(var i=0;i<this.zonas.length;i++){
			if(this.zonas[i].libre){
				usuario.agregarZona(this.zonas[i]);
				this.zonas[i].libre=false;
				break;
			}
		}
	}
	this.crearZonas();
}

function Zona(nombre){
	this.nombre=nombre;
	this.ataque=[];
	this.mano=[];
	this.mazo=[];
	this.libre=true;
	this.agregarAtaque=function(carta){
		this.ataque.push(carta);
	}
	this.agregarMano=function(carta){
		this.mano.push(carta);
	}
	this.agregarMazo=function(mazo){
		this.mazo=mazo;
	}
}

function Usuario(nombre){
	this.nombre=nombre;
	this.juego=undefined;
	this.mazo=[];
	this.mano=[];
	this.zona=undefined;
	this.partida=undefined;
	this.asignarPartida=function(partida){
		this.partida=partida;
	}
	this.agregarZona=function(zona){
		this.zona=zona;
	}
	this.crearPartida=function(nombre){
		this.juego.crearPartida(nombre,this);
	}
	this.eligePartida=function(nombre){
		this.juego.asignarPartida(nombre,this);
	}
}

function Carta(nombre,vidas,ataque,coste){

	this.vidas=vidas;
	this.ataque=ataque;
	this.nombre=nombre;
	this.coste=coste;
}

module.exports.Juego=Juego;
module.exports.Usuario=Usuario;


