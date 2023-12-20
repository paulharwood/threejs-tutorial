import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';
import atmosphereVertexShader from '../shaders/atmosphereVertex.glsl';
import atmosphereFragmentShader from '../shaders/atmosphereFragment.glsl';

console.log(vertexShader, fragmentShader);
const scene = new THREE.Scene();

// create a shpere
const globe_geometry = new THREE.SphereGeometry(6, 64, 64);
const cloud_geometry = new THREE.SphereGeometry(6, 64, 64);
const atmosphere_geometry = new THREE.SphereGeometry(5.45, 64, 64);

const sun_geometry = new THREE.SphereGeometry(5.45, 64, 64);

const globe_material = new THREE.MeshPhysicalMaterial({
    // color:"#00ff99",
    map: new THREE.TextureLoader().load('/8081_earthmap4k.jpg'),
    reflectivity: 0.9,
    sheen:0.8
});

const cloud_material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('/clouds.png'),
    blending: THREE.AdditiveBlending,
    opacity: 0.5
});

const atmosphere_material = new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader ,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide
});


const sun_material = new THREE.MeshStandardMaterial({
  
});

const globe_mesh = new THREE.Mesh(globe_geometry, globe_material);
globe_mesh.rotateY(10);
scene.add(globe_mesh);

const cloud_mesh = new THREE.Mesh(cloud_geometry, cloud_material);
cloud_mesh.rotateY(10);
scene.add(cloud_mesh);

const  atmosphere_mesh = new THREE.Mesh(atmosphere_geometry, atmosphere_material);
atmosphere_mesh.rotateY(20);
scene.add(atmosphere_mesh);


const sizes = {
  width : window.innerWidth,
  height: window.innerHeight
}


// lights
// const light = new THREE.PointLight(0xffffff, 1900, 400);
// light.position.set(-16, -6, 15);

const light = new THREE.DirectionalLight(0xFFFFFF, 2.6);
light.position.set(-10, -5, 1);
light.target.position.set(0,0,0);
scene.add(light);

const ambient = new THREE.AmbientLight( 0x202020 ); // soft white light
scene.add( ambient );

// add a camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);


// //Load background texture
// const loader = new THREE.TextureLoader();
// loader.load('/space.jpg' , function(texture) { scene.background = texture; });


// add it all to the page
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({canvas, antialias: true});

renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio(2);
renderer.render(scene, camera);

scene.background = new THREE.CubeTextureLoader()
	.setPath( '/space_map/' )
	.load( [
				'px.png',
				'nx.png',
				'py.png',
				'ny.png',
				'pz.png',
				'nz.png'
			] );

const controls = new OrbitControls( camera, canvas );
controls.update();

// resize

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);

})

const loop = () => {
  renderer.render(scene, camera);
  controls.update();
  globe_mesh.rotation.y -= 0.0001;
  globe_mesh.position.z -= 0.0001;
  cloud_mesh.rotation.y -= 0.0001;
  cloud_mesh.position.z -= 0.0001;
  atmosphere_mesh.position.z -= 0.0001;
  window.requestAnimationFrame(loop);
}

loop();