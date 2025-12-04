import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import {loadDataFromAPI, loadDataFromJSON} from './load_data.js';

// Constants
const sunRadius = 139.2;

// Planets array
let planets = [];

// Set up the renderer
let w = window.innerWidth;
let h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h);
// Add the renderer to the DOM
document.body.appendChild(renderer.domElement);

// Set up the camera
const fov= 75;
let aspect = w/h;
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
const geo = new THREE.IcosahedronGeometry(sunRadius, 3);
const mat = new THREE.MeshStandardMaterial({
    color: 0xffa600,
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const orbitMat = new THREE.MeshBasicMaterial({
    color: 0xffffff
})

const sunWireMesh = new THREE.Mesh(geo, wireMat);
sunWireMesh.scale.setScalar(1.001);
// Add as a child of mesh
mesh.add(sunWireMesh);

// Add lighting
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff);
scene.add(hemiLight);

// Render the scene
function animate(t = 0)
{
    requestAnimationFrame(animate);

    // Animate the sun
    mesh.rotation.y = t * (0.01/600);

    // Animate the planets
    planets.forEach(function(planet)
    {
        planet.mesh.rotation.y = t * planet.rotationSpeed;
        planet.mesh.position.x = (planet.distanceFromSun + sunRadius) * Math.cos(t * -planet.revolutionSpeed);
        planet.mesh.position.z = (planet.distanceFromSun + sunRadius) * Math.sin(t * -planet.revolutionSpeed);
        console.log(planet.distanceFromSun);
    });

    // Update the scene
    w = window.innerWidth;
    h = window.innerHeight;
    renderer.setSize(w, h);
    aspect = w/h;
    camera.aspect = aspect;

    renderer.render(scene, camera);
    camera.updateProjectionMatrix();
    controls.update();
}
animate();

function createPlanets(data)
{
    data.forEach(function(planet)
    {
        // Create the planet
        const planetGeo = new THREE.IcosahedronGeometry(planet.diameter/10000, 3);
        //console.log(planet.name + " size: " + planet.diameter/10000);
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

        // Add planet to array
        const planetObj = 
        {
            mesh: planetMesh,
            distanceFromSun: planet.distanceFromSun,
            rotationSpeed: 0.01/planet.rotationPeriod,
            revolutionSpeed: .1/planet.orbitalPeriod
        }
        planets[planets.length] = planetObj;

        planetMesh.position.x = planet.distanceFromSun + sunRadius;
        //console.log(planet.name + " distance: " + planet.distanceFromSun);

        // Create the orbit visual
        // TorusGemoetry(radius of torus, radius of tube, radial segments, tubular segments)
        const orbitGeometry = new THREE.TorusGeometry(planet.distanceFromSun + sunRadius, .1, 4, 1000);
        const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMat);
        scene.add(orbitMesh);
        orbitMesh.rotation.x = 90 * (Math.PI / 180);
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Starting application...");
    try 
    {
        // Uncomment whichever data source you wish to collect data from
        //const data = await loadDataFromAPI();
        const data = await loadDataFromJSON();

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