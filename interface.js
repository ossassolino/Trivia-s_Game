import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

class Interface extends THREE.Group{

  constructor() {
    super();
    
    this.scene = new THREE.Scene();
    

    this.camera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000);
    this.camera.position.set(0, 0, 500);

    const geometry = new THREE.SphereGeometry(5, 32, 32);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    this.point = new THREE.Mesh(geometry, material);
    this.point.position.set(0, 0, 0);

    this.light = new THREE.PointLight(0xffffff, 1, 1000);
    this.light.position.set(0, 0, 250);
    this.light.lookAt(this.point.position);

    this.scene.add(this.camera);
    this.scene.add(this.point);
    this.scene.add(this.light);
  }

  getCamera() {
    return this.camera;
  }

  getScene() {
    return this.scene;
  }

  handleResize() {
    this.camera.left = window.innerWidth / - 2;
    this.camera.right = window.innerWidth / 2;
    this.camera.top = window.innerHeight / 2;
    this.camera.bottom = window.innerHeight / - 2;
    this.camera.updateProjectionMatrix();
  }
}

export {Interface};