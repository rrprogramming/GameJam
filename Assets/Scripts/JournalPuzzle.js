#pragma strict

var imageEnabled = false;

var objectCanvas:Canvas;

function Start () {
	gameObject.GetComponent.<Renderer>().material.color = Color.black;
	objectCanvas = gameObject.transform.Find("Canvas").gameObject.GetComponent("Canvas");
}

function Update () {
	if(imageEnabled){
		objectCanvas.enabled = true;
	}else{
		objectCanvas.enabled = false;
	}
}