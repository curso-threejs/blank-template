import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const htmlContainer = document.getElementById("container3D");
const renderer = new THREE.WebGLRenderer();
let scene: THREE.Scene, camera: THREE.PerspectiveCamera, controls: OrbitControls;
let cube: THREE.Object3D;

/** This callback is called whenever the browser window is resized */
function onResize() {
  const width = htmlContainer.offsetWidth;
  const height = htmlContainer.offsetHeight;
  const aspect = width / height;

  // Update the camera properties
  camera.aspect = aspect;
  camera.updateProjectionMatrix();

  // And update the renderer properties (which will update the canvas DOM element)
  renderer.setSize(htmlContainer.offsetWidth, htmlContainer.offsetHeight);
}

/** Function called only once to setup the scene */
function createScene() {
  // Add hemisphere light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  // Add a grid
  const gridHelper = new THREE.GridHelper(8, 8);
  scene.add(gridHelper);

  // Add axes helper
  scene.add(new THREE.AxesHelper(1));

  // Add a cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0xaa00ff });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);
}

/** Function called only once to setup & configure the basic THREE.js components */
function setup() {
  // Add the THREE.js canvas to the HTML
  htmlContainer.appendChild(renderer.domElement);

  // Setup scene & camera
  scene = new THREE.Scene();

  // Property `aspect` will be defined in `onResize` callback
  camera = new THREE.PerspectiveCamera(/* defaulted fov */ undefined, 1, 0.01, 100);
  camera.position.set(5, 5, 10);
  camera.lookAt(0, 0, 0);

  // Setup the control to manipulate the camera with the mouse
  controls = new OrbitControls(camera, renderer.domElement);

  // Setup resize listener
  window.addEventListener("resize", onResize, false);
  onResize();

  createScene();

  renderer.setAnimationLoop(update);
}

/** Loop function called on every frame */
function update() {
  controls.update();
  renderer.render(scene, camera);
}

setup();
