import * as THREE from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

class Button extends THREE.Group{
  constructor() {
    super();
        this.mixer = null;
        
        this.activeAction = null;
        this.model = null;

        let loader = new GLTFLoader();
        loader.load(
            
            "models/button.glb",
            
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(0.5, 0.5, 0.5);
                this.add(this.model);
            }
        );
  }

  


  isClicked(obj) {
    if (obj == this.model) {
      return true;
    }else {
      return false;
    }
  }
}

export {Button};
