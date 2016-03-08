/*function controlPanel(){
	options = document.getElementById( 'leftOpera' );
	//options = document.createElement("test");
//	options.style.position = 'absolute';
//	options.style.align = 'left';
//	options.style.width = '27%';
	options.style.textAlign = 'left';
	sss = "bed";
	string = '<div id="tabs">\
	  <ul>\
	  	<li><a href="#tabs-1">Operations</a></li>\
	    <li><a href="#tabs-2">Add Demos</a></li>\
	    <li><a href="#tabs-3">Add Furnitures</a></li>\
	    <li><a href="#tabs-4">Interesting</a></li>\
	  </ul>\
	    <div id="tabs-1">\
		    <input id="t1" type="button" style="left:0px;" onclick="changeState()" value="changeState"/>\
		    <input type="button" style="left:0px;" onclick="increaseSize()" value="+"/>\
			<input type="button" style="left:0px;" onclick="decreaseSize()" value="-"/>\
			<input type="button" style="left:0px;" onclick="rotate()" value="Rotate"/>\
			<input type="button" style="left:0px;" onclick="move()" value="Move"/>\
			<input type="button" style="left:0px;" onclick="reset()" value="Reset"/>\
			<input type="button" style="left:0px;" onclick="removeObj()" value="Remove"/>\
			<br />\
	 	</div>\
	  	<div id="tabs-2">\
	    	<input type= "image" style="width:78px;height:40px;" onclick="addDemo()" src="models/demo.jpeg" />\
	 	</div>\
	  <div id="tabs-3">\
	    <input type= "image" style="width:78px;height:40px;" onclick="addBed()" src="models/bed.jpg" />\
		<input type= "image" style="width:78px;height:40px;" onclick="addDesk()" src="models/desk.jpg" />\
		<input type= "image" style="width:78px;height:40px;" onclick="addTable()" src="models/table.jpg" />\
		<input type= "image" style="width:78px;height:40px;" onclick="addChair()" src="models/chair.JPG" />\
		<input type= "image" style="width:78px;height:40px;" onclick="addChair1()" src="models/chair1.JPG" />\
		<input type= "image" style="width:78px;height:40px;" onclick="addWindow()" src="models/window.png" />\
	  </div>\
	  <div id="tabs-4">\
		<input type= "image" style="width:78px;height:40px;" onclick="addTv()" src="models/tv.jpg" />\
	  </div>\
	</div>\
	<button id="hide">Hide</button>\
	<button id="show">Show</button>';

	options.innerHTML = string;
	//container.appendChild( options );
}*/


function addSingleRoom1(){
	bedRoom1 = new THREE.Object3D();
	bedRoom1.velocity = THREE.Vector3(0,0,0);
			
				
	var groundGeo = new THREE.PlaneBufferGeometry(length, width);
	var wallGeoFB = new THREE.PlaneBufferGeometry(length, height);
	var wallGeoLR = new THREE.PlaneBufferGeometry(width, height);


	
	var texloader = new THREE.TextureLoader();
	var wallTexture=texloader.load('textures/grey.jpg');	
	wallTexture.minFilter = THREE.LinearFilter;
	wallTexture.magFilter = THREE.LinearFilter;

	
	var floorTexture=texloader.load('textures/walls/floor.jpg');		
	floorTexture.minFilter = THREE.LinearFilter;
	floorTexture.magFilter = THREE.LinearFilter;	



	var top = new THREE.Mesh(groundGeo, new THREE.MeshPhongMaterial({
          				map: wallTexture,
          				//side:THREE.DoubleSide
       			}));
	top.overdraw = true;
	top.position.set(0, height/2, 0);
	top.rotation.x = Math.PI/2;
	bedRoom1.add(top);
	colli.push(top);


	var ground1 = new THREE.Mesh(groundGeo, new THREE.MeshPhongMaterial({
          				map: floorTexture,
          				//side:THREE.DoubleSide
       			}));
	ground1.overdraw = true;
	ground1.position.set(0, -height/2, 0);
	ground1.rotation.x = -Math.PI/2;
	bedRoom1.add(ground1);
	colli.push(ground1);
				
	var wallleft = new THREE.Mesh(wallGeoLR, new THREE.MeshPhongMaterial({
          				map: wallTexture,
          				//side:THREE.DoubleSide
       			}));
	wallleft.overdraw = true;
	wallleft.position.set(-length/2, 0, 0);
	wallleft.rotation.y = Math.PI/2;
	bedRoom1.add(wallleft);
	colli.push(wallleft);

		
	var wallright = new THREE.Mesh(wallGeoLR, new THREE.MeshPhongMaterial({
          				map: wallTexture,
          				//side:THREE.DoubleSide
       			}));
	wallright.overdraw = true;
	wallright.position.set(length/2, 0, 0);
	wallright.rotation.y = -Math.PI/2;
	bedRoom1.add(wallright);
	colli.push(wallright);


				
	var wallback = new THREE.Mesh(wallGeoFB, new THREE.MeshPhongMaterial({
          				map: wallTexture,
          				//side:THREE.DoubleSide
    				}));
	wallback.overdraw = true;
	wallback.position.set(0, 0, -width/2);
	bedRoom1.add(wallback);
	colli.push(wallback);


				
	var wallfront = new THREE.Mesh(wallGeoFB, new THREE.MeshPhongMaterial({
          				map: wallTexture,
          				//side:THREE.DoubleSide
    	}));
	wallfront.overdraw = true;
	wallfront.position.set(0, 0, width/2);
	wallfront.rotation.y = -Math.PI;

	bedRoom1.add(wallfront);
	colli.push(wallfront);

	var light = new THREE.PointLight(0xffffff, 1.2, 1000);
	light.position.set( 0, 0, 0 );
	scene.add(light);
	bedRoom1.add(light);

	bedRoom1.add(new THREE.PointLightHelper(light, 3));

	bedRoom1.add(objControl);
	scene.add(bedRoom1);
}


function checkBoundary(MovingCube,object3D,box,length,width,height,objControl){
	if(MovingCube){
//		console.log("running checking");
		object3D.position.copy(MovingCube.position);
		object3D.rotation.copy(MovingCube.rotation);
	//	box = new THREE.Box3().setFromObject(MovingCube);
		if(MovingCube.location == "front"){
			object3D.rotation.y = 2*Math.PI;
		}
		else if(MovingCube.location == "backwall"){
			object3D.rotation.y = Math.PI;
		}
		else if(MovingCube.location == "leftwall"){
			object3D.rotation.y = Math.PI/2;
		}
		else if(MovingCube.location == "rightwall"){
			object3D.rotation.y = -Math.PI/2;			
		}
		//check ground objects
		if(MovingCube.label == "ground"){
			box = new THREE.Box3().setFromObject(MovingCube);
			//check length bound
			if((MovingCube.position.x + box.size().x/2) > length/2){
		//		console.log("hit");
				MovingCube.position.x = length/2 - box.size().x/2;
				objControl.update();
			}
			if((MovingCube.position.x - box.size().x/2) < -length/2){
		//		console.log("hit");
				MovingCube.position.x = -length/2 + box.size().x/2;
				objControl.update();
			}
			//check width bound
			if((MovingCube.position.z + box.size().z/2) > width/2){
		//		console.log("hit");
				MovingCube.position.z = width/2 - box.size().z/2;
				objControl.update();
			}
			if((MovingCube.position.z - box.size().z/2) < -width/2){
		//		console.log("hit");
				MovingCube.position.z = -width/2 + box.size().z/2;
				objControl.update();
			}
			// cant up
			if((MovingCube.position.y < -height/2) ){
		//		console.log("hit");
				MovingCube.position.y = -height/2;
				objControl.update();
			}
			if((MovingCube.position.y > -height/2)){
		//		console.log("hit");
				MovingCube.position.y = -height/2 ;
				objControl.update();
			}
		}
		else if(MovingCube.label == "wall"){
			if(MovingCube.location == "front"){
				//check length bound
				if((MovingCube.position.x + box.size().x/2) > length/2){
		//			console.log("turn rightwall");
					MovingCube.rotation.y = -Math.PI/2;
					MovingCube.position.z = -width/2 + box.size().x/2 + 2;
					MovingCube.position.x = length/2 - 1;
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					MovingCube.location = "rightwall";
					
				}
				else if((MovingCube.position.x - box.size().x/2) < -length/2){
		//			console.log("leftwall");
					MovingCube.rotation.y = Math.PI/2;
					MovingCube.position.z = -width/2+box.size().x/2+2;
					MovingCube.position.x = -length/2+1;
					MovingCube.location = "leftwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}
				//check width bound
				else if((MovingCube.position.z - box.size().z/2) != -width/2+1){
		//			console.log("hit1");
				//	console.log("hit1---box.size().z/2: "+box.size().z/2);
					MovingCube.position.z = -width/2 + box.size().z/2 + 1;
					objControl.update();
				}
				// cant up
				else if((MovingCube.position.y - box.size().y/2 < -height/2) ){
		//			console.log("hit2");
					MovingCube.position.y = -height/2+box.size().y/2;
					objControl.update();
				}
				else if((MovingCube.position.y + box.size().y/2 > height/2)){
		//			console.log("hit3");
					MovingCube.position.y = height/2 - box.size().y/2;
					objControl.update();
				}
			}
			else if(MovingCube.location == "leftwall"){
				//check length bound
				//console.log(MovingCube.position.z+" "+width/2 + " "+box.size().x/2);
				if(MovingCube.position.x !=  -length/2+1){
		//			console.log("hit4");
					MovingCube.position.x = -length/2+1;
					objControl.update();
				}
				//check width bound
				else if((MovingCube.position.z + box.size().x/2) > width/2){
		//			console.log("backwall");
					MovingCube.rotation.y = Math.PI;
					MovingCube.position.z = width/2-box.size().x/2-1;
					MovingCube.position.x = -length/2+box.size().x/2;
					MovingCube.location = "backwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}
				else if((MovingCube.position.z - box.size().x/2) < -width/2){
		//			console.log("front");
					MovingCube.rotation.y = 2*Math.PI;
					MovingCube.position.x = -length/2 + box.size().x/2+10;
					MovingCube.position.z = -width/2 + box.size().x/2 + 1;
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					MovingCube.location = "front";
				}
				// cant up
				else if((MovingCube.position.y - box.size().y/2 < -height/2) ){
		//			console.log("hit6");
					MovingCube.position.y = -height/2+box.size().y/2;
					objControl.update();
				}
				else if((MovingCube.position.y + box.size().y/2 > height/2)){
		//			console.log("hit7");
					MovingCube.position.y = height/2 - box.size().y/2;
					objControl.update();
				}		
			}
			else if(MovingCube.location == "backwall"){
				//check length bound
				if(MovingCube.position.z + 1 != width/2){
		//			console.log("hit8");
					MovingCube.position.z = width/2 - 1;
					objControl.update();
				}
				else if((MovingCube.position.x + box.size().x/2) > length/2){
		//			console.log("rightwall");				
					MovingCube.rotation.y = -Math.PI/2;
					MovingCube.position.z = width/2 - box.size().x/2;
					MovingCube.position.x = length/2-1;
					MovingCube.location = "rightwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					//MovingCube.position.x = length/2 - box.size().x/2;
				}
				else if((MovingCube.position.x - box.size().x/2) < -length/2){
		//			console.log("turn leftwall");
					MovingCube.rotation.y = Math.PI/2;
					MovingCube.position.z = width/2-box.size().x/2-2;
					MovingCube.position.x = -length/2+box.size().x/2+1;
					MovingCube.location = "leftwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}				
				// cant up
				else if((MovingCube.position.y - box.size().y/2 < -height/2) ){
		//			console.log("hit10");
					MovingCube.position.y = -height/2+box.size().y/2;
					objControl.update();
				}
				else if((MovingCube.position.y + box.size().y/2 > height/2)){
		//			console.log("hit11");
					MovingCube.position.y = height/2 - box.size().y/2;
					objControl.update();
				}	
			}
			else if(MovingCube.location == "rightwall"){
					//check length bound
				//console.log(MovingCube.position.z+" "+width/2 + " "+box.size().x/2);
				if(MovingCube.position.x !=  length/2-1){
		//			console.log("hit12");
					MovingCube.position.x = length/2-1;
					objControl.update();
				}
				//check width bound
				else if((MovingCube.position.z + box.size().x/2) > width/2){
		//			console.log("turn backwall");
					MovingCube.rotation.y = Math.PI;
					MovingCube.position.z = width/2-1;
					MovingCube.position.x = length/2-box.size().x/2-1;
					MovingCube.location = "backwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}
				if((MovingCube.position.z - box.size().x/2) < -width/2){
		//			console.log("turn front");
					MovingCube.rotation.y = 2*Math.PI;
					MovingCube.position.x = length/2 - box.size().x/2 -2;
					MovingCube.position.z = -width/2 + box.size().z/2 + 1;
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					MovingCube.location = "front";
				}
				// cant up
				else if((MovingCube.position.y - box.size().y/2 < -height/2) ){
		//			console.log("hit14");
					MovingCube.position.y = -height/2+box.size().y/2;
					objControl.update();
				}
				else if((MovingCube.position.y + box.size().y/2 > height/2)){
		//			console.log("hit15");
					MovingCube.position.y = height/2 - box.size().y/2;
					objControl.update();
				}	
			}
		}	
		else if(MovingCube.label == "wallGround"){
			if(MovingCube.location == "front"){
				//check length bound
				if((MovingCube.position.x + box.size().x/2) > length/2){
		//			console.log("turn rightwall");
					MovingCube.rotation.y = -Math.PI/2;
					MovingCube.position.z = -width/2 + box.size().x/2 + 2;
					MovingCube.position.x = length/2 - 1;
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					MovingCube.location = "rightwall";
					
				}
				else if((MovingCube.position.x - box.size().x/2) < -length/2){
		//			console.log("leftwall");
					MovingCube.rotation.y = Math.PI/2;
					MovingCube.position.z = -width/2+box.size().x/2+2;
					MovingCube.position.x = -length/2+1;
					MovingCube.location = "leftwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}
				//check width bound
				else if(MovingCube.position.z != -width/2+1){
		//			console.log("hit16");
					//console.log("hit1---box.size().z/2: "+box.size().z/2);
					MovingCube.position.z = -width/2  + 1;
					objControl.update();
				}
				// cant up
				else if((MovingCube.position.y - box.size().y/2 != -height/2) ){
		//			console.log("hit17");
					MovingCube.position.y = -height/2 + box.size().y/2;
					objControl.update();
				}
			}
			else if(MovingCube.location == "leftwall"){
				//check length bound
				//console.log(MovingCube.position.z+" "+width/2 + " "+box.size().x/2);
				if(MovingCube.position.x !=  -length/2+1){
		//			console.log("hit18");
					MovingCube.position.x = -length/2+1;
					objControl.update();
				}
				//check width bound
				else if((MovingCube.position.z + box.size().x/2) > width/2){
		//			console.log("backwall");
					MovingCube.rotation.y = Math.PI;
					MovingCube.position.z = width/2-box.size().x/2-1;
					MovingCube.position.x = -length/2+box.size().x/2;
					MovingCube.location = "backwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}
				else if((MovingCube.position.z - box.size().x/2) < -width/2){
		//			console.log("front");
					MovingCube.rotation.y = 2*Math.PI;
					MovingCube.position.x = -length/2 + box.size().x/2+10;
					MovingCube.position.z = -width/2 + box.size().x/2 + 1;
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					MovingCube.location = "front";
				}
				// cant up
				else if((MovingCube.position.y - box.size().y/2 != -height/2) ){
		//			console.log("hit19");
					MovingCube.position.y = -height/2 + box.size().y/2;
					objControl.update();
				}	
			}
			else if(MovingCube.location == "backwall"){
				//check length bound
				if(MovingCube.position.z + 1 != width/2){
		//			console.log("hit8");
					MovingCube.position.z = width/2 - 1;
					objControl.update();
				}
				else if((MovingCube.position.x + box.size().x/2) > length/2){
		//			console.log("rightwall");				
					MovingCube.rotation.y = -Math.PI/2;
					MovingCube.position.z = width/2 - box.size().x/2;
					MovingCube.position.x = length/2-1;
					MovingCube.location = "rightwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					//MovingCube.position.x = length/2 - box.size().x/2;
				}
				else if((MovingCube.position.x - box.size().x/2) < -length/2){
		//			console.log("turn leftwall");
					MovingCube.rotation.y = Math.PI/2;
					MovingCube.position.z = width/2-box.size().x/2-2;
					MovingCube.position.x = -length/2+box.size().x/2+1;
					MovingCube.location = "leftwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}				
				// cant up
				else if((MovingCube.position.y - box.size().y/2 != -height/2) ){
		//			console.log("hit20");
					MovingCube.position.y = -height/2 + box.size().y/2;
					objControl.update();
				}
			}
			else if(MovingCube.location == "rightwall"){
					//check length bound
				//console.log(MovingCube.position.z+" "+width/2 + " "+box.size().x/2);
				if(MovingCube.position.x !=  length/2-1){
		//			console.log("hit21");
					MovingCube.position.x = length/2-1;
					objControl.update();
				}
				//check width bound
				else if((MovingCube.position.z + box.size().x/2) > width/2){
		//			console.log("turn backwall");
					MovingCube.rotation.y = Math.PI;
					MovingCube.position.z = width/2-1;
					MovingCube.position.x = length/2-box.size().x/2-1;
					MovingCube.location = "backwall";
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
				}
				if((MovingCube.position.z - box.size().x/2) < -width/2){
		//			console.log("turn front");
					MovingCube.rotation.y = 2*Math.PI;
					MovingCube.position.x = length/2 - box.size().x/2 -2;
					MovingCube.position.z = -width/2 + box.size().z/2 + 1;
					objControl.update();
					objControl.detach();
					objControl.attach(MovingCube);
					objControl.update();
					MovingCube.location = "front";
				}
				// cant up
				else if((MovingCube.position.y - box.size().y/2 != -height/2) ){
		//			console.log("hit22");
					MovingCube.position.y = -height/2 + box.size().y/2;
					objControl.update();
				}
			}
		}		
	}
}


function collision( wallArray )
{
	// send rays from center of person to each vertex in bounding geometry
	for (var vertexIndex = 0; vertexIndex < person.children[1].geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = person.children[1].geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( person.matrix );
		var directionVector = globalVertex.sub( person.position );
		
		var ray = new THREE.Raycaster( person.position, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( wallArray );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
			return true;
	}
	return false;
}

function fpsControl(){
	var gravity = new THREE.Vector3(0,-10,0);
	if(state == -1){
		var delta = clock.getDelta();

		if(firstTime){
			 //person

			person = new THREE.Object3D();
			person.add(camera);
			controls.reset();
			camera.position.set(0,35,10); // first-person view


			person.position.set(0,0,0);
			//person.position.set(-600,100,500);
			person.rotation.y = -Math.PI / 2.0;

			boundingG = new THREE.CubeGeometry(40,80,40);
			boundingG.computeBoundingSphere();
			boundingM = new THREE.MeshBasicMaterial( {color:0xff0000, transparent:false, wireframe:true} );
			bounding  = new THREE.Mesh( boundingG, boundingM );
			bounding.visible = false;
			person.add(bounding);

			person.velocity = new THREE.Vector3(0,0,0);
			scene.add(person);
    		firstTime = false;
		}

			//controls.update();
/*		var moveDistance = 200 * delta; // 200 pixels per second  // should be velocity?
		var rotateAngle = Math.PI / 4 * delta;   // pi/4 radians (45 degrees) per second
		var cursorSpeed = 200 * delta;
*/
		var moveDistance = 3; // 200 pixels per second  // should be velocity?
		var rotateAngle = 0.01;   // pi/4 radians (45 degrees) per second
		var cursorSpeed = 3;

		// movement controls	
		var move = { xDist: 0, yAngle: 0, zDist: 0 };


		// forwards/backwards
		if (keyboard.pressed("W"))
			move.zDist -= moveDistance;
		if (keyboard.pressed("S"))
			move.zDist += moveDistance;
		// turn left/right
		if (keyboard.pressed("Q"))
			move.yAngle += rotateAngle;
		if (keyboard.pressed("E"))
			move.yAngle -= rotateAngle;
		// left/right (strafe)
		if ( keyboard.pressed("A") )
			move.xDist -= moveDistance;
		if ( keyboard.pressed("D") )
			move.xDist += moveDistance;


			// up/down (debugging fly)
		if ( keyboard.pressed("T") )
		{
			person.velocity = new THREE.Vector3(0,0,0);
			person.translateY( moveDistance );
		}
		if ( keyboard.pressed("G") )
		{
			person.velocity = new THREE.Vector3(0,0,0);
			person.translateY( -moveDistance );
		}



		person.translateZ( move.zDist );
		person.rotateY( move.yAngle );
		person.translateX( move.xDist );
		person.updateMatrix();

			// look up/down
		if ( keyboard.pressed("3") ) // third-person view
			camera.position.set(0,50,250);
		if ( keyboard.pressed("1") ) // first-person view
			camera.position.set(0,35,10);
		if ( keyboard.pressed("R") )
			camera.rotateX(  rotateAngle );
		if ( keyboard.pressed("F") )
			camera.rotateX( -rotateAngle );

		// limit camera to +/- 45 degrees (0.7071 radians) or +/- 60 degrees (1.04 radians)
		camera.rotation.x = THREE.Math.clamp( camera.rotation.x, -1.04, 1.04 );

			// pressing both buttons moves look angle to horizon
		if ( keyboard.pressed("R") && keyboard.pressed("F") )
			camera.rotateX( -6 * camera.rotation.x * rotateAngle );


	// collision detection!
	if ( collision( colli ) )
	{
		person.translateX( -move.xDist );
		person.rotateY( -move.yAngle );
		person.translateZ( -move.zDist );
		person.updateMatrix();
		
		if ( collision( colli ) )
			console.log( "Something's wrong with collision..." );
		
	}

		// TODO: make sure there is no double-jump glitch
		//	(e.g. hold down space sometimes results in double-jump)
		if ( keyboard.pressed("space") && (person.velocity.y == 0) )
			person.velocity = new THREE.Vector3(0,7,0);
		
		person.velocity.add( gravity.clone().multiplyScalar( delta ) );
		person.translateY( person.velocity.y );
		person.updateMatrix();

		if ( collision(colli) )
		{
			person.translateY( -person.velocity.y );
			person.updateMatrix();
			person.velocity = new THREE.Vector3(0,0,0);
		}
	}
}

function addGrass(){
	var gt = THREE.ImageUtils.loadTexture( "textures/terrain/grasslight-big.jpg" );
	var gg = new THREE.PlaneBufferGeometry( 16000, 16000 );
	var gm = new THREE.MeshPhongMaterial( { color: 0xffffff, map: gt } );

	var ground = new THREE.Mesh( gg, gm );
	ground.position.set(0,-height/2-1,0);
	ground.rotation.x = - Math.PI / 2;
	ground.material.map.repeat.set( 64, 64 );
	ground.material.map.wrapS = THREE.RepeatWrapping;
	ground.material.map.wrapT = THREE.RepeatWrapping;
	// note that because the ground does not cast a shadow, .castShadow is left false
	ground.receiveShadow = true;

	scene.add(ground);
	colli.push(ground);
}

function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}

function addSkyBox(){
	var path = "textures/cube/Park2/";
	var format = '.jpg';
	var urls = [
		path + 'posx' + format, path + 'negx' + format,
		path + 'posy' + format, path + 'negy' + format,
		path + 'posz' + format, path + 'negz' + format
	];

	var textureCube = THREE.ImageUtils.loadTextureCube( urls, THREE.CubeRefractionMapping );
	refractionMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube, refractionRatio: 1, reflectivity: 1.1 } );												
																										
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;
				
	var material = new THREE.ShaderMaterial( {
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		side: THREE.BackSide
	} ),
	mesh = new THREE.Mesh( new THREE.BoxGeometry( 100000, 100000, 100000 ), material );
	mesh.position.set(0,-height/2-1,0);
	colli.push(mesh);
	scene.add(mesh);
}

function removeObj(){
	objControl.detach();
	var temp;
	for(i=0;i<objects.length;i++){
		if(objects[i] == MovingCube){
			objects.splice(i,1);
		}
	}
	for(i=0;i<colli.length;i++){
		if(colli[i] == MovingCube){
			colli.splice(i,1);
		}
	}
	for(i=0;i<groups.length;i++){
		if(groups[i].number == MovingCube.number){
			temp = groups[i];
		}
	}
	if(temp){
		bedRoom1.remove(temp);
	}
	bedRoom1.remove(MovingCube);
}


function loadFurniture(n,t,c,p,sx,sy,sz,px,py,pz,m3d){
	var loader = new THREE.OBJMTLLoader();
		loader.load( p+'.obj', p+'.mtl', function ( object ) {          
			console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");  
	 		object.scale.set(sx,sy,sz);
	        if(c == "window"){
	        	object.rotation.y = -Math.PI/2;
	        }
	        if(c == "window"){
	        	object.position.set(0,0,10);
	        	var ttt = new THREE.Box3().setFromObject(object);
	        	var geometry = new THREE.PlaneGeometry(ttt.size().x-10, ttt.size().y-10, 1, 1);
				var mesh = new THREE.Mesh( geometry, refractionMaterial );
				mesh.position.set(0,0,0.1);
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;
				var cubeBox = new THREE.Box3().setFromObject(mesh);
				mesh.box = cubeBox;
				m3d.add(mesh);
	        }
			var ttt = new THREE.Box3().setFromObject(object);
	        m3d.add(object);
			m3d.number = labelNum;


			var geometry = new THREE.BoxGeometry(ttt.size().x,ttt.size().y,ttt.size().z);
			var material = new THREE.MeshBasicMaterial( { color: 0x7777ff} );	
			var invisibleMesh = new THREE.Mesh( geometry, material );
			invisibleMesh.label = t;
			invisibleMesh.name = n;
			invisibleMesh.category = c;
			invisibleMesh.material = material.wireframe;
			cubeBox = new THREE.Box3().setFromObject(invisibleMesh);
			invisibleMesh.box = cubeBox;
			invisibleMesh.number = labelNum;
			m3d.position.copy(invisibleMesh.position);
			if(c == "door"){
				invisibleMesh.position.set(-length/2+1,-height/2+ttt.size().y/2,-width/2+ttt.size().x/2);
				invisibleMesh.location = "leftwall";
				invisibleMesh.rotation.y = Math.PI/2;
				m3d.rotation.y = invisibleMesh.rotation.y;
			}
	       else if(c == "window"){
	        	invisibleMesh.position.set(0,0,-width/2+1);
	        	invisibleMesh.location = "front";
	        }
	        else {
	        	invisibleMesh.position.set(px,py,pz);
	        }
			MovingCube = invisibleMesh;
			box = MovingCube.box;
			object3D = m3d
			bedRoom1.add(invisibleMesh);
			objects.push(invisibleMesh);
			groups.push(m3d);
			colli.push(invisibleMesh);
			bedRoom1.add(object3D);
			objControl.attach(MovingCube);
			objControl.update();
			labelNum++;
		//	addToCatagory(c);
			checkBoundary(MovingCube,object3D,box,length,width,height,objControl);
	    }); 

}

function db_addObj(name,scale_x,scale_y,scale_z,position_x,position_y,position_z,rotate_x,rotate_y,rotate_z){
	//console.log("pppp: "+obj_path);
	var loader = new THREE.OBJMTLLoader();
	var model3D = new THREE.Object3D();

//	console.log("start---");
	var data = "action=getlink&name="+name;	
	$.getJSON("db_connect/create.php",data, function(json){ 
   	  	obj_name = json.name;
     	obj_type = json.type;
     	obj_category = json.category;
     	obj_path = json.path;
     	obj_width = json.width;
     	obj_length = json.length;
     	obj_height = json.height;
     	obj_material = json.material;
     	loadFurniture(obj_name,obj_type,obj_category,obj_path,scale_x,scale_y,scale_z,position_x,position_y,position_z,model3D);
     	info.innerHTML = '<h4>'+obj_name+'</h4>\
						<b>Width: </b>'+obj_width+'<br/>\
						<b>Length: </b>'+obj_length+'<br/>\
						<b>Height: </b>'+obj_height+'<br/>\
						<b>Material: </b>'+obj_material+'<br/>\
						<input type="button" onclick="similarObject()" value="Suggest"/>\
						<br/>';
     	document.getElementById('item_name').value = obj_name;
    }); 
}
function addHDTV(){
	db_addObj("monitor",5,5,5,0,0,0,0,0,0);
}
function addWindow(){
	db_addObj("windownew",2,2,2,0,0,0,0,0,0);
}

function addBed(){
	//addObj("bed",0.4,0.4,0.4,0,-height/2,0,0,0,0,"ground","bed");
	db_addObj("bednew",100,100,100,0,-height/2,0,0,0,0);
}
function addTable(){
	//addObj('tabletestnew',1,1,1,0,-height/2,-width/2,0,0,0,"ground","table");
	db_addObj("tabletestnew",20,20,20,0,-height/2,0,0,0,0);
}
function addChair(){
//	addObj('Office Chairnew',2,2,2,0,-height/2,0,0,0,0,"ground","chair");
		db_addObj("Office Chairnew",5,5,5,0,-height/2,0,0,0,0);

}
function addDesk(){
	//addObj('desktest',1,1,1,0,-150,0,0,0,0,"ground","table");
		db_addObj("desktest",1,1,1,0,-height/2,0,0,0,0);
}
function addChair1(){
	//addObj('office_chair',45,45,45,0,-150,0,0,0,0,"ground","chair");
		db_addObj("office_chair",45,45,45,0,-height/2,0,0,0,0);

}
function rotate(){
	objControl.setMode( "rotate" );
}

function increaseSize(){
	objControl.setSize( objControl.size + 0.1 );
}

function decreaseSize(){
	objControl.setSize( Math.max(objControl.size - 0.1, 0.1 ) );
}
function move(){
	objControl.setMode( "translate" );
}
function reset(){
	MovingCube.position.set(0,-height/2,0);
}
function addDemo(){
	addObj('desktest',1,1,1,250,-150,-450,0,-Math.PI/2,0);
	addObj('lamp',1,1,1,-400,-150,430,0,0,0);
	addObj('tabletest',1,1,1,400,-150,300,0,-Math.PI/2,0);
	addObj('Office Chair',3,3,3,300,-150,300,0,Math.PI/2,0);
	addObj('bedtest',0.4,0.4,0.4,-250,-150,100,0,Math.PI/2,0);
}
function changeState(){
	state = -state;
	if(state == 1){
		controls.reset();
		person.remove(camera);
		scene.remove(person);
		firstTime = true;
	}
}

