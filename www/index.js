import { hello, get_matrix } from 'physics';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

console.log(get_matrix());

const scene = new THREE.Scene();
const loader = new THREE.TextureLoader();

// Create a basic perspective camera
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth/window.innerHeight, 0.1, 1000
);
camera.position.set(0, 2, 10)

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias:true });
renderer.setClearColor("#000000");
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement
document.body.appendChild(canvas);

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------

// Create a ground plane
const planeSize = 40;
const planeTex = loader.load('resources/images/checker.png');
planeTex.wrapS = THREE.RepeatWrapping;
planeTex.wrapT = THREE.RepeatWrapping;
planeTex.magFilter = THREE.NearestFilter;
planeTex.repeat.set(planeSize/2, planeSize/2);

const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  map: planeTex,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.rotation.x = Math.PI * -.5;
scene.add(plane);

// Create a Cube Mesh with basic material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshPhongMaterial({ color: "#433F81" });
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 1;
scene.add(cube);

// Create a Sphere
const sphereGeo = new THREE.SphereGeometry(2, 32, 16);
const sphereMat = new THREE.MeshPhongMaterial({ color: "#FF0000" });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(-3, 2, 0);
scene.add(sphere);

// Ambient light
const ambLight = new THREE.AmbientLight(0xFFFFFF, .2);
scene.add(ambLight);

// Directional Light
const dirLight = new THREE.DirectionalLight(0xFFFFFF, .4);
dirLight.position.set(5, 10, 5);
dirLight.target.position.set(0, 0, 0);
scene.add(dirLight);
scene.add(dirLight.target);

// Orbit Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// Render Loop
function render() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();
