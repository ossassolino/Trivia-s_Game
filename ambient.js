import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

class Ambient extends THREE.Group{
  constructor(scene) {
    super();
        this.mixer = null;
        this.scene = scene;
        this.activeAction = null;
        this.model = null;

        let loader = new GLTFLoader();
        loader.load(
            
            "models/stage.glb",
            
            (gltf) => {  
                this.model = gltf.scene;
                this.model.position.set(0, 0, 0);
                this.add(this.model);

                loader.load('models/stagetavolo.glb', (gltf) => {
                    this.model = gltf.scene;
                    this.model.position.set(0, 0, 0);
                    this.add(this.model);
                });
            }
        );
  }
}

export {Ambient};