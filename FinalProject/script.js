import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import {loadDataFromAPI} from './load_data.js';

// Planets object
let planets = [];

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
const far = 100000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 300;

const scene = new THREE.Scene();

// Adds orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;
    
// Creates the sun (size of 1.0, detail of 2)
const geo = new THREE.IcosahedronGeometry(139.2, 3);
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
const sunWireMesh = new THREE.Mesh(geo, wireMat);
sunWireMesh.scale.setScalar(1.001);
// Add as a child of mesh
mesh.add(sunWireMesh);

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

function createPlanets(data)
{
    data.forEach(function(planet)
    {
        const planetGeo = new THREE.IcosahedronGeometry(planet.diameter/10000, 3);
        console.log(planet.name + " size: " + planet.diameter/10000);
        const planetMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            flatShading: true
        });
        const planetMesh = new THREE.Mesh(planetGeo, planetMat);
        scene.add(planetMesh);

        const planetWireMesh = new THREE.Mesh(planetGeo, wireMat);
        planetWireMesh.scale.setScalar(1.001);
        // Add as a child of mesh
        planetMesh.add(planetWireMesh);

        planetMesh.position.x = planet.distanceFromSun + 139.2;
        console.log(planet.name + " distance: " + planet.distanceFromSun);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Starting application...");
    try 
    {
        // Uncomment whichever data source you wish to collect data from
        const data = await loadDataFromAPI();

        // Testing data
        /*
        data.forEach(function(planet)
        {
            console.log("Planet name: " + planet.name);
        });
        */

        createPlanets(data);
        console.log("Application ready!");
    } 
    catch (error)
    {
        console.error("Application failed to start:", error);
    }
});