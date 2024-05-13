import * as THREE from 'three';

class QuestionPanel extends THREE.Group {
  constructor(question, answers) {
    super();

    const canvas = document.createElement('canvas');
    canvas.width = 2500;
    canvas.height = 1024;
    const context = canvas.getContext('2d');

    context.fillStyle = 'white';
    context.fillRect(0, 0,canvas.width, canvas.height);

    context.font = '70px Arial';
    context.fillStyle = 'black';
    context.fillText(question, 10, 50, 2500);

    answers.forEach((answer, index) => {
      context.fillText(`${index + 1}. ${answer}`, 10, 100 + index * 50);
    });

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({map: texture});
    const geometry = new THREE.PlaneGeometry(22.982, 9.41436);

    this.panel = new THREE.Mesh(geometry, material);
    this.add(this.panel);
  }
}

export {QuestionPanel};