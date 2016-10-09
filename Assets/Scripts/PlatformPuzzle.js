#pragma strict

var id:int;

function Start () {
	gameObject.GetComponent.<Renderer>().material.color = Color.red;
}

function Update () {
	
}

function OnCollisionEnter(col:Collision){
	var script: PlatformPuzzle = col.gameObject.GetComponent(PlatformPuzzle);

	if (script.id == id){
		gameObject.GetComponent.<Renderer>().material.color = Color.green;
	}
}