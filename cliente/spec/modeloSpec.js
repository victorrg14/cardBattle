describe("El juego de las cartas...", function() {
  var juego;
  var usr1,usr2;

  beforeEach(function() {
    juego = new Juego();
    usr1 = new Usuario("pepe");
    usr2 = new Usuario("juan");
  });

  it("Deberia tener una colección de cartas. Compruebo condiciones iniciales (cartas, usuario)", function() {
    expect(juego.cartas).toBeDefined();
    expect(juego.cartas.length).toEqual(0);
    expect(juego.usuarios).toBeDefined();
    expect(juego.usuarios.length).toEqual(0);
    expect(juego.partidas).toBeDefined();
    expect(juego.partidas.length).toEqual(0);
  });

  it("Los usuarios tienen un mazo", function() {
    expect(usr1.mazo).toBeDefined();
    expect(usr1.mazo.length).toEqual(0);
    expect(usr2.mazo).toBeDefined();
    expect(usr2.mazo.length).toEqual(0);
  });

  it("Los usuarios tiene mano (inicialmente sin cartas)", function(){
    expect(usr1.mano).toBeDefined();
    expect(usr1.mano.length).toEqual(0);
    expect(usr2.mano).toBeDefined();
    expect(usr2.mano.length).toEqual(0);
    });

  it("Agrego el usuario Pepe al juego", function() {
    juego.agregarUsuario(usr1);
    expect(juego.usuarios.length).toEqual(1);
    expect(juego.usuarios[0].nombre).toEqual("pepe");
    expect(usr1.mazo.length).toEqual(30);
  });

  it("agregar pepe y juan el usuario al juego", function(){
    juego.agregarUsuario(usr1);
    juego.agregarUsuario(usr2);
    expect(juego.usuarios.length).toEqual(2);
    expect(juego.usuarios[0].nombre).toEqual("pepe");
    expect(juego.usuarios[1].nombre).toEqual("juan");
    expect(usr1.mazo.length).toEqual(30);
    expect(usr2.mazo.length).toEqual(30);
  });

  it("Pepe crea una partida, juan la elige y se les asigna las zonas correspondientes", function() {
    juego.agregarUsuario(usr1);
    juego.agregarUsuario(usr2);
    usr1.crearPartida("prueba");
    usr2.eligePartida("prueba");
    expect(juego.usuarios[0].partida.nombre).toEqual("prueba");
    expect(usr1.partida.nombre).toEqual("prueba");
    expect(juego.usuarios[1].partida.nombre).toEqual("prueba");
    expect(juego.usuarios[0].zona.nombre).toEqual("arriba");
    expect(juego.usuarios[1].zona.nombre).toEqual("abajo");
    if(usr1.turno){
      expect(usr2.turno).toBe(false);
    }
    else{
      expect(usr1.turno).toBe(false);
    }

  });

  it("Comprobar que funciona la funcion pasarTurno", function(){

    juego.agregarUsuario(usr1);
    juego.agregarUsuario(usr2);
    usr1.crearPartida("prueba");
    usr2.eligePartida("prueba");
    usr1.turno=true;
    usr2.turno=false;
    usr1.pasarTurno();
    expect(usr1.turno).toBe(false);
    expect(usr2.turno).toBe(true);


  })




});
