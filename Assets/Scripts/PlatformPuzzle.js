#pragma strict

var target:GameObject;
var character:GameObject;
var script:PlayableCharacter = character.GetComponent(PlayableCharacter);
var entered = false;

function Start () {
	gameObject.GetComponent.<Renderer>().material.color = Color.red;
}

function Update () {
	if(target.transform.position.x < gameObject.transform.position.x+3 && target.transform.position.x > gameObject.transform.position.x-3 && !entered){
		if(target.transform.position.y < gameObject.transform.position.y+3 && target.transform.position.y > gameObject.transform.position.y-3){
			script.grab = false;
			script.colliding = false;

			gameObject.transform.position.z-=2;

			entered = true;
		}
	}
	if(entered){
		if(gameObject.transform.position.z > -9){
			gameObject.transform.eulerAngles = Vector3 (target.transform.eulerAngles.x,target.transform.eulerAngles.y,target.transform.eulerAngles.z);

			gameObject.transform.position.x = target.transform.position.x;
			gameObject.transform.position.y = target.transform.position.y;
			gameObject.transform.position.z -=0.02;
		}
	}
}