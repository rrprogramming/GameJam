#pragma strict

var mainCharacter:GameObject;
var speedx = 0.0;
var speedy = 0.0;

function Start () {
	speedx = 0.0;
	speedy = 0.0;
}

function Update () {
	if(Input.GetKey(KeyCode.D)){
		speedx +=0.05;
	}

	if(Input.GetKey(KeyCode.A)){
		speedx -=0.05;
	}
	if(Input.GetKey(KeyCode.W)){
		speedy +=0.05;
	}
	if(Input.GetKey(KeyCode.S)){
		speedy -=0.05;
	}
	if(Input.GetKey(KeyCode.Space)){
		if(speedy>0){
			speedy-=0.05;
		}else{
			speedy+=0.05;
		}

		if(speedx>0){
			speedx-=0.05;
		}else{
			speedx+=0.05;
		}
	}

	mainCharacter.GetComponent.<Rigidbody>().velocity = new Vector3(speedx, speedy, 0);

	//camara.transform.position = Vector3 (cubito.transform.position.x,cubito.transform.position.y+2,cubito.transform.position.z-10);
}