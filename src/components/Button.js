export class Button {
    constructor(scene, image, x, y) {
        this.image = image;
        this.relatedScene = scene;
        this.x = x;
        this.y = y;
    }

    create() {
        this.startButton = this.relatedScene.add.image(this.x, this.y, this.image).setInteractive();

        this.startButton.on('pointerdown', () => {this.doClick();
        });
    }
}
