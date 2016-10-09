#pragma strict

var mainCharacter:GameObject;
var camara:GameObject;
var collidingObject:GameObject;
var universe:GameObject;

var movement:float;

var colliding = false;		//maneja los eventos de collisiones para mantener exclusividad mutua con otras actividades
var grab = false;			//controla los agarres
var pause = false;			//controla la interaccion del jugador con el personaje

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

function Journal(){
	if(Input.GetKeyDown(KeyCode.Space) && colliding && collidingObject.tag == "Journal"){
		var script: JournalPuzzle = collidingObject.GetComponent(JournalPuzzle);
		if(script.imageEnabled){
			Debug.Log("un-pause");
			script.imageEnabled = false;
			pause = false;
		}else{
			Debug.Log("pause");
			script.imageEnabled = true;
			mainCharacter.transform.position.x = collidingObject.transform.position.x;
			pause = true;
		}
	}
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
			collidingObject.transform.position.x = mainCharacter.transform.position.x-3.2;
		}

		if(distx > 0){
			collidingObject.transform.position.x = mainCharacter.transform.position.x+3.2;
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

	if(!pause){
		if(Input.GetKey(KeyCode.D)){	//movimiento a la derecha
			if(speedx>-3)
				speedx -= 0.1;
		}

		if(Input.GetKey(KeyCode.A)){	//movimiento a la izquierda
			if(speedx<3)
				speedx += 0.1;
		}
		if(Input.GetKey(KeyCode.W)){	//movimiento hacia arriba
			if(speedy<3)
				speedy += 0.1;
		}
		if(Input.GetKey(KeyCode.S)){	//movimiento hacia abajo
			if(speedy>-3)
				speedy -= 0.1;
		}
	}else{
		speedy = 0.0;
		speedx = 0.0;
	}

	//======================AGARRE====================================
	Agarre();

	//===================CODIGO DE COLORES============================
	Colores();

	//===================JOURNAL PUZZLE==============================
	Journal();

	//se altera la velocidad del jugador
	mainCharacter.GetComponent.<Rigidbody>().velocity = new Vector3(0, speedy, 0);

	universe.transform.eulerAngles = Vector3(0,0,universe.transform.eulerAngles.z+(speedx)*-0.05);

	//la camara se mueve con el jugador
	camara.transform.position = Vector3 (mainCharacter.transform.position.x,mainCharacter.transform.position.y+3,mainCharacter.transform.position.z+15);
	camara.transform.eulerAngles = Vector3(0,180,0);
}

function OnCollisionEnter(col:Collision){

	if(col.gameObject.tag == "Mobile"){
		collidingObject = col.gameObject;

		colliding = true;

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
	if(col.gameObject.tag == "Journal"){
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