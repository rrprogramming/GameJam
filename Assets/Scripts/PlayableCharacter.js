#pragma strict

var mainCharacter:GameObject;
var camara:GameObject;
var collidingObject:GameObject;

var movement:float;

var colliding = false;		//maneja los eventos de collisiones para mantener exclusividad mutua con otras actividades
var grab = false;			//controla los agarres

var speedx = 0.0;			//maneja la velocidad en x del personaje
var speedy = 0.0;			//maneja la velocidad en y del personaje

var distx = 0.0;			//maneja las distancias entre objetos por el eje x
var disty = 0.0;			//maneja las distancias entre objetos por el eje y
var distz = 0.0;			//maneja las distancias entre objetos por el eje z

function Start () {
	speedx = 0.0;
	speedy = 0.0;

	mainCharacter.GetComponent.<Renderer>().material.color = Color.green;
}

function Colores () {
	if(Input.GetKeyDown(KeyCode.Space) && colliding && collidingObject.tag == "ColorCode"){
		var script: ColorPanel = collidingObject.GetComponent(ColorPanel);
		if(script.colorSet > 3){
			script.colorSet = 0;
		}else{
			script.colorSet += 1;
		}
	}


	//se altera la velocidad del jugador
	mainCharacter.GetComponent.<Rigidbody>().velocity = new Vector3(speedx, speedy, 0);

	//la camara se mueve con el jugador
	camara.transform.position = Vector3 (mainCharacter.transform.position.x,mainCharacter.transform.position.y+3,mainCharacter.transform.position.z-10);
}

function Agarre () {
	//solo si esta cerca de algun objeto movible se efectua la acción de agarrar
	if(Input.GetKeyUp(KeyCode.Space) && colliding && collidingObject.tag == "Mobile"){
		grab = true;
		collidingObject.GetComponent.<Renderer>().material.color = Color.red;
	}

	//si se esta agarrando algo la posicion del objeto agarrado se mueve con respecto al jugador
	if(grab){
		if(distx < 0){
			collidingObject.transform.position.x = mainCharacter.transform.position.x-1.2;
		}

		if(distx > 0){
			collidingObject.transform.position.x = mainCharacter.transform.position.x+1.2;
		}

		collidingObject.transform.position.y = mainCharacter.transform.position.y;
		collidingObject.transform.position.z = 0;
		collidingObject.GetComponent.<Rigidbody>().velocity = new Vector3 (0,0,0);
	}

	//si se esta agarrando el objeto se suelta
	if(Input.GetKeyDown(KeyCode.Space) && grab){
		grab = false;
		colliding = false;

		collidingObject.GetComponent.<Renderer>().material.color = Color.white;
	}
}

function Update () {

	if(Input.GetKey(KeyCode.D)){	//movimiento a la derecha
		speedx += 0.5;
	}

	if(Input.GetKey(KeyCode.A)){	//movimiento a la izquierda
		speedx -= 0.5;
	}
	if(Input.GetKey(KeyCode.W)){	//movimiento hacia arriba
		speedy += 0.5;
	}
	if(Input.GetKey(KeyCode.S)){	//movimiento hacia abajo
		speedy -= 0.5;
	}

	//======================AGARRE====================================

	Agarre();

	//===================CODIGO DE COLORES==============================
	Colores();
}

function OnCollisionEnter(col:Collision){
	colliding = true;

	if(col.gameObject.tag == "Mobile"){
		collidingObject = col.gameObject;

		//para amantener el objeto agarrado relativo a la posicion del jugador se toman estos valores
		if(collidingObject.transform.position.x < 0 || mainCharacter.transform.position.x < 0){
			distx = Mathf.Abs(mainCharacter.transform.position.x) - Mathf.Abs(collidingObject.transform.position.x);
		}else{
			distx = Mathf.Abs(collidingObject.transform.position.x) - Mathf.Abs(mainCharacter.transform.position.x);
		}
		//disty = collidingObject.transform.position.y - mainCharacter.transform.position.y;
		//distz = collidingObject.transform.position.z - mainCharacter.transform.position.z;
	}
	if(col.gameObject.tag == "ColorCode"){
		collidingObject = col.gameObject;
		colliding = true;
	}
}

function OnCollisionExit(col:Collision){
	//si no esta sosteniendo nada se cancela la variable de control
	if(!grab){
		colliding = false;
	}
}