// import npm lib
import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();

// Setup scene
const canvas = document.querySelector('.main-canvas')
const scene = new THREE.Scene();

// camera
const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 2000);
camera.position.y = 500;
camera.position.z = 500;
camera.position.x = 500;
camera.updateProjectionMatrix();
camera.lookAt(scene.position);

//renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true, 
	alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1);

window.addEventListener("resize", () => {
	renderer.setSize(window.innerWidth, window.innerHeight)
	renderer.setPixelRatio(window.devicePixelRatio)
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

// Display axes
const axesHelper = new THREE.AxesHelper(200); //size of axes, The X axis is red. The Y axis is green. The Z axis is blue.
// scene.add( axesHelper );
// End Setup Scene

// texture loader
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./img/textures.png')
const color = 0xffffff

//cube function
const createCube = (positionX, positionY, positionZ) => {
	const geometry = new THREE.BoxGeometry(20, 20, 20);
	const material = new THREE.MeshMatcapMaterial({
		matcap: texture,
		color: color
		// color: '#' + (Math.random() * 0xFFFFFF << 0).toString(16)
	});
	const cube = new THREE.Mesh(geometry, material);
	material.needsUpdate = true
	cube.position.set(positionX, positionY, positionZ);
	scene.add(cube);

	// gsap
	const cubeTl = new gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
	// cubeTl.to(cube.scale, { x: 2, ease: Expo.easeOut, duration: 0.5 }); // coté 1
	// cubeTl.to(cube.scale, { z: 2, ease: Expo.easeOut, duration: 0.5}); // coté 2
	cubeTl.to(cube.scale, { x: 2, y: 2, z: 2, ease: Elastic.easeOut, duration: 1 }); // hauteur
	cubeTl.to(cube.scale, { x: 1, y: 1, z: 1, ease: Expo.easeOut, duration: 1 }); // scale down
	// cubeTl.to(cube.rotation, { y: -Math.PI, ease: Expo.easeOut, duration: 0.8 }); // rotate

	const sound = new Audio('./sounds/boom.wav');
	sound.loop = false;
	sound.play();
}

const createSphere = (positionX, positionY, positionZ) => {
	const geometry = new THREE.SphereGeometry( 15, 32, 16 );
	const material = new THREE.MeshMatcapMaterial({
		matcap: texture,
		color: color
	});
	const sphere = new THREE.Mesh(geometry, material);
	material.needsUpdate = true
	sphere.position.set(positionX, positionY, positionZ);
	scene.add(sphere);

	// gsap
	const sphereTl = new gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
	sphereTl.to(sphere.scale, { x: 2, y: 2, z: 2, ease: Expo.easeOut, duration: 0.5 }); // scale up
	sphereTl.to(sphere.scale, { x: 1, y: 1, z: 1, ease: Expo.easeOut, duration: 1 }); // scale down

	const sound = new Audio('./sounds/snare.wav');
	sound.loop = false;
	sound.play();

}

const createTorus = (positionX, positionY, positionZ) => {
	const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
	const material = new THREE.MeshMatcapMaterial({
		matcap: texture,
		color: color
	});
	const torus = new THREE.Mesh( geometry, material );
	material.needsUpdate = true
	torus.position.set(positionX, positionY, positionZ);
	scene.add(torus);

	// gsap
	const torusTl = new gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
	torusTl.to(torus.scale, { x: 3, y: 3, z: 3, ease: Expo.easeOut, duration: 0.5 }); // scale up
	torusTl.to(torus.scale, { x: 1, y: 1, z: 1, ease: Expo.easeOut, duration: 1 }); // scale down

	const sound = new Audio('./sounds/tink.wav');
	sound.loop = false;
	sound.play();

}

const createCone = (positionX, positionY, positionZ) => {
	const geometry = new THREE.ConeGeometry( 5, 20, 32 );
	const material = new THREE.MeshMatcapMaterial({
		matcap: texture,
		color: color
	});
	const cone = new THREE.Mesh( geometry, material );
	material.needsUpdate = true
	cone.position.set(positionX, positionY, positionZ);
	scene.add(cone);

	// gsap
	const coneTL = new gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
	coneTL.to(cone.scale, { x: 3, y: 5, z: 3, ease: Expo.easeOut, duration: 0.5 }); // scale up
	coneTL.to(cone.scale, { x: 1, y: 1, z: 1, ease: Expo.easeOut, duration: 1 }); // scale down

	const sound = new Audio('./sounds/tom.wav');
	sound.loop = false;
	sound.play();

}


const mouse = new THREE.Vector3();
canvas.addEventListener('mousemove', (e) => {
	
	mouse.x = (e.clientX / window.innerWidth) * 2 - 1
	mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
	mouse.z = 0
	mouse.unproject(camera);

	while(scene.children.length > 30){ 
		scene.remove(scene.children[0]); 
	}
	
});

// random functions
const shapeArray = [createCube, createSphere, createTorus, createCone]

setInterval(function() {

	const scale = .5
	const x = mouse.x / window.innerWidth
	const y = mouse.y / window.innerHeight
	const rnd = simplex.noise2D(x * scale, y * scale)
	console.log(rnd)
	if (rnd < 0.25) {
		createCube
	} 
	else if (rnd >=0.25 < 0.5) {
		createSphere
	} 
	else if (rnd >=0.5 < 0.75) {
		createTorus
	}
	else if (rnd >= 0.75) {
		createCone
	}
	shapeArray[ Math.floor(Math.abs(rnd) * shapeArray.length ) ](mouse.x, mouse.y, mouse.z)

}, 150)

// const clearButton = document.getElementById('clear')
// clearButton.addEventListener('click', () => {
// 	while(scene.children.length > 0){ 
// 		scene.remove(scene.children[0]); 
// 	}
// })


// à chaque image : 60fps
const update = () => {
	requestAnimationFrame(update)

	// Render WebGL Scene
	renderer.render(scene, camera);
}
requestAnimationFrame(update)