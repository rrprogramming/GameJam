#pragma strict

var mainCharacter:GameObject;
var camara:GameObject;
var collidingObject:GameObject;

var colliding = false;		//maneja los eventos de collisiones para mantener exclusividad mutua con otras actividades
var grab = false;			//controla los agarres

var speedx = 0.0;
var speedy = 0.0;

var distx = 0.0;			//maneja las distancias entre objetos por el eje x
var disty = 0.0;			//maneja las distancias entre objetos por el eje y
var distz = 0.0;			//maneja las distancias entre objetos por el eje z

function Start () {
	speedx = 0.0;
	speedy = 0.0;

	mainCharacter.GetComponent.<Renderer>().material.color = Color.green;
}

function Update () {
	if(Input.GetKey(KeyCode.D)){	//movimiento a la derecha
		speedx +=0.05;
	}

	if(Input.GetKey(KeyCode.A)){	//movimiento a la izquierda
		speedx -=0.05;
	}
	if(Input.GetKey(KeyCode.W)){	//movimiento hacia arriba
		speedy +=0.05;
	}
	if(Input.GetKey(KeyCode.S)){	//movimiento hacia abajo
		speedy -=0.05;
	}

	//solo si esta cerca de algun objeto movible se efectua la acción de agarrar
	if(Input.GetKeyUp(KeyCode.Space) && colliding){
		grab = true;
		collidingObject.GetComponent.<Renderer>().material.color = Color.red;
	}

	//si se esta agarrando algo la posicion del objeto agarrado se mueve con respecto al jugador
	if(grab){
		collidingObject.transform.position.x = distx + mainCharacter.transform.position.x;
		collidingObject.transform.position.y = disty + mainCharacter.transform.position.y;
		collidingObject.transform.position.z = distz + mainCharacter.transform.position.z;
		collidingObject.GetComponent.<Rigidbody>().velocity = new Vector3 (0,0,0);
	}

	//si se esta agarrando el objeto se suelta
	if(Input.GetKeyDown(KeyCode.Space) && grab){
		grab = false;
		colliding = false;

		collidingObject.GetComponent.<Renderer>().material.color = Color.white;
	}

	//se altera la velocidad del jugador
	mainCharacter.GetComponent.<Rigidbody>().velocity = new Vector3(speedx, speedy, 0);

	//la camara se mueve con el jugador
	camara.transform.position = Vector3 (mainCharacter.transform.position.x,mainCharacter.transform.position.y+3,mainCharacter.transform.position.z-10);
}

function OnCollisionEnter(col:Collision){
	colliding = true;

	if(col.gameObject.name == "Puzzle1"){
		collidingObject = GameObject.Find("Puzzle1");

		//para amantener el objeto agarrado relativo a la posicion del jugador se toman estos valores
		distx = collidingObject.transform.position.x - mainCharacter.transform.position.x;
		disty = collidingObject.transform.position.y - mainCharacter.transform.position.y;
		distz = collidingObject.transform.position.z - mainCharacter.transform.position.z;
	}
}

function OnCollisionExit(col:Collision){
	//si no esta sosteniendo nada se cancela la variable de control
	if(!grab){
		colliding = false;
	}
}