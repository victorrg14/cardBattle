var _=require("underscore");

function Juego(){
	this.cartas=[];
	this.usuarios=[];
	this.partidas=[];
	this.agregarCarta=function(carta){
		this.cartas.push(carta);
	}
	this.agregarUsuario=function(usuario){
		usuario.mazo=_.shuffle(this.crearColeccion());
		usuario.juego=this;
		this.usuarios.push(usuario);
	}
	this.crearColeccion=function(){
		var mazo=[]
		//10 ataque 5 coste 3 vida 5
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Dragon"+i,5,5,3));
		}
		//10 ataque 3 coste 5 vida 10
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Guerrero"+i,10,3,5));
		}
		//10 ataque 2 coste 1 vida 2
		for(var i=0;i<10;i++){
			mazo.push(new Carta("Esbirro"+i,2,2,1));
		}
		return mazo;

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

	//this.crearColeccion();	
}

function Partida(nombre){
	this.nombre=nombre;
	this.usuariosPartida=[];
	this.tablero=undefined;
	this.crearTablero=function(){
		this.tablero=new Tablero();
	}
	this.asignarUsuario=function(usuario){
		usuario.asignarPartida(this);
		this.usuariosPartida.push(usuario);
		this.tablero.asignarUsuario(usuario);
		this.comprobarInicio();
	}

	this.comprobarInicio=function(){
		if(this.usuariosPartida.length==2){
			this.turnoInicial();
			this.asignarManoInicial();
		}
	}
	this.asognarManoInicial=function(){
		for(var i=0; i<this.usuariosPartida.length; i++){
			this.usuariosPartida[i].manoInicial();
		}
	}
	this.turnoInicial=function(){
		var numero=Math.round(Math.random());
		this.usuariosPartida[numero].esMiTurno();
	}
	this.cambiarTurno=function(){
		if(this.usuariosPartida[0].turno){
			this.usuariosPartida[0].turno=false;
			this.usuariosPartida[1].esMiTurno();
		}
		else{
			this.usuariosPartida[1].turno=false;
			this.usuariosPartida[0].esMiTurno();
		}
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
	//this.mazo=[];
	//this.mano=[];
	this.ataque=[];
	this.turno=false;
	this.zona=undefined;
	this.partida=undefined;
	this.elixir=1;
	this.consumido=0;
	this.vidas=20;
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
	this.pasarTurno=function(){
		this.partida.cambiarTurno();
	}
	this.esMiTurno=function(){

		this.turno=true;
		this.cogerCarta();
		//this.mano.push(carta);
		this.elixir=this.consumido+1;
		this.consumido=0;
	}
	this.cogerCarta=function(){
		var carta;
		return this.mazo.find(function(each){
			return each.posicion=="mazo";
		});
		carta.posicion="mano";	
	}
	this.jugarCarta=function(carta){
		if(this.elixir>=carta.coste){
			carta.posicion="ataque";
			this.elixir=this.elixir-carta.coste;
			this.consumido=this.consumido+carta.coste;
		}

		//this.ataque.push(carta);

	}

	this.ataque=function(carta,objetivo){
		objetivo.esAtacado(carta);

	}
	this.esAtacado=function(carta){
		this.vidas=this.vidas-carta.ataque;
		this.comprobarVidas();
	}
	this.comprobarVidas=function(){
		if(this.vidas<=0){
			this.juego.fin();
		}
	}
	this.manoInicial=function(){
		for(var i=0; i<5;i++){
			this.cogerCarta();
		}
	}
}

function Carta(nombre,vidas,ataque,coste){

	this.vidas=vidas;
	this.ataque=ataque;
	this.nombre=nombre;
	this.coste=coste;
	this.posicion="mazo";
	this.esAtacado=function(carta){
		this.vidas=this.vidas-carta.ataque;
		this.comprobarVidas();
	}
	this.comprobarVidas=function(){
		if(this.vidas<=0){
			this.posicion="cementerio";
		}
	}
}

module.exports.Juego=Juego;
module.exports.Usuario=Usuario;


