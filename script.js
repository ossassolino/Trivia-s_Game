import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import {Pin} from './pin.js';
import {Button} from './button.js';
import {Ambient} from './ambient.js';
import {Question, acquireData} from './question.js';
import {Interface} from './interface.js';
import {QuestionPanel} from './questionpanel.js';
import {SpinningWheel} from './spinningwheel.js';


const gl = document.getElementById("canvas");       // Il canvas in cui renderizzare
let renderer = null; // Il motore di render

let scene = null;    // la scena radice

let camera = null;   // la camera da cui renderizzare la scena
let camX = 7, camY = 4, camZ = -3;    // Posizione della camera

let interfacez = null;   // L'interfaccia utente

let clock = null;    // Oggetto per la gestione del timinig della scena*/

let dl = null;

let dt = 0;

let scenes = 0;

let controls = null;

const raycaster = new THREE.Raycaster();
let pointer = new THREE.Vector2();

let light = null;

let question = null;
let dataquestion = await acquireData();
console.log(dataquestion);

let pin = null;
let pinBot = null;

let stage = null;
let button = null;
let buttonBot = null;
let spinningWheel = null;
let questionpanel = null;

function initScene(){
    if (renderer != null) return;

    //document.body.innerHTML = "";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let width =  window.innerWidth;
    let height = window.innerHeight;

    renderer = new THREE.WebGLRenderer({antialias: "true", canvas: gl, powerPreference: "high-performance"});
    renderer.autoClear = false;
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor("black", 1);
    renderer.shadowMap.enabled = true;

    camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 500);
    camera.position.set(camX, camY, camZ);
    camera.lookAt(0, 0, 0);

    interfacez = new Interface();

    clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    controls = new FirstPersonControls( camera, renderer.domElement );
	controls.movementSpeed = 150;
	controls.lookSpeed = 0.1;
    controls.enabled = true;

    stage = new Ambient();
    scene.add(stage);
    
    pin = new Pin(0);
    pin.position.set(7, 1.2, -2);
    pin.scale.set(1.7, 1.7, 1.7);

    

    pinBot = new Pin(1);
    pinBot.position.set(-7, 1.2, -3);
    pinBot.scale.set(8, 8, 8);
    pinBot.rotation.y = Math.PI;
    scene.add(pinBot);

    button = new Button(scene);
    scene.add(button);
    button.position.set(6.4673, 3.3, 0);
    button.receiveShadow = false;

    buttonBot = new Button(scene);
    scene.add(buttonBot);
    buttonBot.position.set(-6.4673, 3.3, 0);
    buttonBot.receiveShadow = false;

    spinningWheel = new SpinningWheel();
    spinningWheel.position.set(7, 3, 0);
    scene.add(spinningWheel);

    
    
    light = new THREE.AmbientLight(0xFFFFFF, 10);
    //light.position.set(0, 100, 0);
    //light.lookAt(button.position);
    //light.castShadow = false;
    scene.add(light);
    
    
    document.addEventListener('click', onPointerClick);

    renderer.setAnimationLoop(animate);
}

function onPointerClick(event){
    switch(scenes){
        case 0:
            pointer.x = 0;
            pointer.y = 0;
            break;
        case 1:
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
            break;
    }
    raycaster.setFromCamera(pointer, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);
    let obj = null;
    if (intersects.length > 0){
        obj = intersects[0].object.parent;
    }

    console.log(button.isClicked(obj));
    console.log(obj.children[0]);

    if (button.isClicked(obj)){
        console.log("Button clicked");
        question = acquireData();
        console.log(question);
        question = new Question(dataquestion);
        questionpanel = new QuestionPanel(question.getQuestion(), question.getAnswers());
        scene.add(questionpanel);
        questionpanel.position.set(0, 5.82902, -11.85);
        scenes = 1;
        pin.click();
        
    }

}

function animate(){
    dt = clock.getDelta();
    switch(scenes){
        case 0:
            render();
            break;
        case 1:
            render1();
            break;
        case 2:
            break;
    }
}

function render(){  
    scene.remove(pin); 
    renderer.clear();
    controls.update( dt );
    camera.position.set(camX, camY, camZ);
    spinningWheel.spin(0.01);
    renderer.render(scene, camera);
    renderer.render(interfacez.getScene(), interfacez.getCamera());
}

function render1(){
    scene.add(pin); 
    renderer.clear();
    controls.update( dt );
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 5, -11.85);
    renderer.render(scene, camera);
    pin.update(dt);
    
    document.getElementsByTagName("canvas")[0].style.cursor = "default";
}


window.onload = initScene();
window.onresize = function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderer.setSize(canvas.width, canvas.height);
    camera.aspect = canvas.width/canvas.height;
    interfacez.handleResize()
    camera.updateProjectionMatrix();
}

