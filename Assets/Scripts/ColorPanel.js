#pragma strict

var colorKey:GameObject;
var colorSet = 0;


function Start () {
	
}

function Update () {

	switch (colorSet){
		case 1:
			colorKey.GetComponent.<Renderer>().material.color = Color.red;
		break;

		case 2:
			colorKey.GetComponent.<Renderer>().material.color = Color.green;
		break;

		case 3:
			colorKey.GetComponent.<Renderer>().material.color = Color.blue;
		break;

		case 4:
			colorKey.GetComponent.<Renderer>().material.color = Color.yellow;
		break;
	}
}