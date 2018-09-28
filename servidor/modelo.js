
function Juego(){
	this.cartas=[];
	this.usuarios=[];
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
			this.cartas.push(new Carta("dragon"+i,5,5,3));
		}
		//10 ataque 3 coste 5 vida 10
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("guerrero"+i,10,3,5));
		}
		//10 ataque 2 coste 1 vida 2
		for(var i=0;i<10;i++){
			this.cartas.push(new Carta("esbirro"+i,2,2,1));
		}
	}
	this.crearColeccion();
}

function Usuario(nombre){
	this.nombre=nombre;
	this.juego=undefined;
	this.mazo=[];
	this.obtenerMazo=function(){
		//this.mazo=this.juego.obtenerColeccionInicial();
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
module.exports.Carta=Carta;


