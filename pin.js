import * as THREE from 'three';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

class Pin extends THREE.Group {
    constructor(numeropin) {
        super();
        this.model = null;
        this.activeAction = null;
        this.mixer = null;
        this.animations = [];

        const loader = new GLTFLoader();

        if (numeropin == 0){ 
            loader.load('./models/businessman.glb', (gltf) => {
                this.model = gltf.scene;
                this.add(this.model);
                this.mixer = new THREE.AnimationMixer(this.model);
                this.animations = gltf.animations;
                this.idle();
            });
        }else if (numeropin == 1){
            loader.load('./models/imposter.glb', (gltf) => {
                this.model = gltf.scene;
                this.add(this.model);

                this.mixer = new THREE.AnimationMixer(this.model);
                this.animations = gltf.animations;
            });
        }
    }
    update(dt) {
        if (this.mixer !== null) this.mixer.update(dt);
    }

    click(){
        if (this.activeAction) {
            this.activeAction.fadeOut(0.5);
        }
        this.activeAction = this.mixer.clipAction(this.animations[10]);
        this.activeAction.setLoop(THREE.LoopOnce);
        this.activeAction.clampWhenFinished = true;
        this.activeAction.reset();
        this.activeAction.fadeIn(0.5).play();
    }

    idle(){
        if (this.activeAction) {
            this.activeAction.fadeOut(0.5);
        }
        this.activeAction = this.mixer.clipAction(this.animations[5]);
        this.activeAction.reset();
        this.activeAction.fadeIn(0.5).play();
    }

}

export { Pin };