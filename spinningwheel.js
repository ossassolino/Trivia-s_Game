import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

class SpinningWheel extends THREE.Group {
  constructor() {
    super();

    /*const geometry = new THREE.CylinderGeometry(5, 5, 1, 32);
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    this.wheel = new THREE.Mesh(geometry, material);*/

    //this.add(this.wheel);

    let loader = new GLTFLoader();
    loader.load("models/spinningwheel.glb",
        (gltf) => {
            this.wheel = gltf.scene;
            this.wheel.scale.set(3,3,3);
            this.wheel.position.set(-6, -1.6, -11);
            this.add(this.wheel);
        }
    );
  }

  spin(speed = 0.01) {
    //da finire
    //this.wheel.rotation.y += speed;
  }
}

export {SpinningWheel};