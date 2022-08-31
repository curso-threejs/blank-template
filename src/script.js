import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const htmlContainer = document.getElementById("container3D");
const renderer = new THREE.WebGLRenderer();
let scene, camera, controls;

/** This callback is called whenever the browser window is resized
 */
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

/** Function called only once to create & setup the scene
 */
function createScene() {
  // Add focal light
  const light = new THREE.PointLight(0xffffff, 0.5);
  light.position.set(5, 5, 2);
  scene.add(light);

  // Add a light helper to help us visualize it on scene
  const lightHelper = new THREE.PointLightHelper(light, 0.3);
  scene.add(lightHelper);

  // Add a grid
  const gridHelper = new THREE.GridHelper(8, 8);
  gridHelper.rotateX(-Math.PI / 2);
  scene.add(gridHelper);

  // Add a sphere
  const ballGeometry = new THREE.SphereBufferGeometry(1);
  const ballMaterial = new THREE.MeshPhongMaterial({ color: 0x8800ee });
  const ball = new THREE.Mesh(ballGeometry, ballMaterial);
  scene.add(ball);
}

/** Function called only once to setup & configure the basic THREE.js components
 */
function setup() {
  // Add the THREE.js canvas to the HTML
  htmlContainer.appendChild(renderer.domElement);

  // Setup scene & camera
  scene = new THREE.Scene();

  const width = htmlContainer.offsetWidth;
  const height = htmlContainer.offsetHeight;
  const aspect = width / height;
  camera = new THREE.PerspectiveCamera(
    /* defaulted fov */ undefined,
    aspect,
    0.01,
    100
  );

  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);

  // Setup the control to manipulate the camera with the mouse
  controls = new OrbitControls(camera, renderer.domElement);

  // Setup resize listener
  window.addEventListener("resize", onResize, false);
  onResize();

  createScene();
}

/** Loop function called on every frame
 */
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

setup();
animate();
