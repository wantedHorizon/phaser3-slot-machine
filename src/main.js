import Phaser from 'phaser';

import HelloWorldScene from './scenes/HelloWorldScene';
import GameScene from './scenes/GameScene';
const config = {
	scale: {

		parent: 'CanvasDiv',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        isPortrait: true

	},
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 }
		}
	},
	dom: {
		createContainer: true
	},
	 "transparent"    : true,
	scene: [GameScene ]
}

export default new Phaser.Game(config)
