import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";

// Set up the renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Set up the camera
const fov= 75;
const aspect = w/h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

// Adds orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

// Creates an icosahedron primitive (size of 1.0, detail of 2)
const geo = new THREE.IcosahedronGeometry(1.0, 2);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
// Add as a child of mesh
mesh.add(wireMesh);

// Add lighting
const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);


// Render the scene
function animate(t = 0)
{
    requestAnimationFrame(animate);
    //mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
    mesh.rotation.y = t * 0.0001
    renderer.render(scene, camera);
    controls.update();
}
animate();