# cardBattle

##Sprint1: Definición del proyecto

Se implementará una arquitectura SaaS con el objetivo de implementar un juego de cartas parecido a Hearthstone. Herramientas: NodeJS, Sublime Text, Kunagi, Jasmine y GitHub.

##Sprint2: Diseño del modelo y arquitectura base SaaS

#####Diseño del modelo

	Definición de entidades: Juego, Usuario, Partida, Tablero, Zona, Carta.
	Definición de estados: Turno, NoMiTurno, Inicial, Jugando, Final.
	La partida tiene dos jugadores.
	Cada jugador tiene un mazo (colección de cartas), mano (hasta 10 cartas), y una zona de ataque
	El juego tiene una colección de partidas y una colección de usuarios.

#####Diseño de la arquitectura

	Definir la estructura de carpetas de la solución.

##Sprint3: Implementar API Rest y API WebSocket
	
	AgregarUsuario
	CrearPartida
	ObtenerPartidas
	ElegirPartida
	ObtenerCartasMano
	JugarCarta
	PasarTurno 