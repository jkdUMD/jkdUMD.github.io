import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import {loadDataFromAPI, loadDataFromJSON} from './load_data.js';

// Constants
const sunRadius = 139.2;

// Planets array
let planets = [];

// Tracks whether or not the renderer is displaying
let showingRenderer = true;

// Set up the renderer
let w = window.innerWidth;
let h = window.innerHeight - document.getElementById('title-controls').scrollHeight - 60;
//console.log("HEIGHT: " + document.getElementById('title-controls').scrollHeight - 60);
//console.log(h);
//console.log(window.innerHeight);
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
    color: 0xff8400,
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
        //console.log(planet.distanceFromSun);
    });

    // Update the scene
    if (showingRenderer)
    {
        w = window.innerWidth;
        h = window.innerHeight - document.getElementById('title-controls').scrollHeight - 60;
        renderer.setSize(w, h);
        aspect = w/h;
        camera.aspect = aspect;

        renderer.render(scene, camera);
        camera.updateProjectionMatrix();
        controls.update();
    }
}
animate();

// Create the planets from the dataset
function createPlanets(data)
{
    data.forEach(function(planet)
    {
        // Create the planet
        const planetGeo = new THREE.IcosahedronGeometry(planet.diameter/10000, 2);
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

// Adds the planet data to the html to display later
function createTable(data) {
    let content = "";
    data.forEach(function(planet)
    {
        content += `<div class="planet-section">
                        <h3>
                            ${planet.name}
                        </h3>
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Diameter (km)</th>
                                    <th>Distance from Sun (million km)</th>
                                    <th>Rotational Period (hours)</th>
                                    <th>Orbital Period (days)</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>${planet.diameter}</td>
                                <td>${planet.distanceFromSun}</td>
                                <td>${getRotationPeriod(planet.rotationPeriod)}</td>
                                <td>${planet.orbitalPeriod}</td>
                            </tr>
                        </table>
                    </div>`;
    });
    console.log(content);
    document.getElementById("data-display").innerHTML = content;
}

// Helper function to perform absolute value on rotation period
function getRotationPeriod(value)
{
    if (value < 0)
    {
        return value * -1;
    }
    return value;
}

// Update button states
function updateButtonStates(activeView) {
  document.querySelectorAll(".view-button").forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(`btn-${activeView}`).classList.add("active");
}

// Toggles the renderer the hide and display
function toggleRenderer()
{
    if (showingRenderer)
    {
        showingRenderer = false;
        w = 0;
        h = 0;
        renderer.setSize(w, h);
        aspect = 1;
        camera.aspect = aspect;

        renderer.render(scene, camera);
        camera.updateProjectionMatrix();
    }
    else
    {
        showingRenderer = true;
        w = window.innerWidth;
        h = window.innerHeight - document.getElementById('title-controls').scrollHeight - 50;
        renderer.setSize(w, h);
        aspect = w/h;
        camera.aspect = aspect;

        renderer.render(scene, camera);
        camera.updateProjectionMatrix();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Starting application...");
    try 
    {
        // Uncomment whichever data source you wish to collect data from
        const data = await loadDataFromAPI();
        //const data = await loadDataFromJSON();

        // Testing data
        /*
        data.forEach(function(planet)
        {
            console.log("Planet name: " + planet.name);
        });
        */

        createPlanets(data);
        createTable(data);

        // Set up button event handlers - this pattern always works!
        document.getElementById("btn-model").onclick = () => {
            toggleRenderer();
            updateButtonStates("model");
            // This line changes the visibility of the table view
            // I learned how to do this from here: https://stackoverflow.com/questions/15241915/how-to-change-css-property-using-javascript
            document.getElementById("data-display").style.display = "none";
        };

        document.getElementById("btn-table").onclick = () => {
            toggleRenderer();
            updateButtonStates("table");
            document.getElementById("data-display").style.display = "flex";
        };

        console.log("Application ready!");
    } 
    catch (error)
    {
        console.error("Application failed to start:", error);
    }
});