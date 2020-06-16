import phaser from 'phaser';
import Button from '../components/Button';

const GROUND_KEY = 'ground';
const SYMBOL_NAME = 'potion';
const COL = 5;
const ROW = 3;
const IMG_SIZE = 140;
const IMG_NUM = 4;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export default class GameScene extends Phaser.Scene {
    constructor() {

        super('game-scene');
        this.state = {
            isSpinning: false,
            colNumSpin: [],
            inter: null,
            sameRowMode: false,
            timouts: []
        }
    }

    preload() {
        this.load.image('slotContainer', 'images/slotContainer.png')
        this.load.image('potion1', 'images/potion1.png')
        this.load.image('potion2', 'images/potion2.png')
        this.load.image('potion3', 'images/potion3.png')
        this.load.image('potion4', 'images/potion4.png')

        this.load.image('bg', 'images/bg-default.jpg');
        this.load.image('bt-spin', 'images/button_spin.png');
        this.load.image('bt-stop', 'images/button_stop.png');

        this.load.audio('bg_music', 'images/BG_Music.wav');
        this.load.audio('spin_music', 'images/Spin.wav');


        this.btnPressed = false;
    }

    create() {
       // this.add.image(100, 100, 'bg')




        this.add.image(380, 250, 'slotContainer');

        //button creation
        const feature1 = {
            src: 'bt-spin',
            onClick: this.onSpinHandler,
            visible: true,
            disable: false,
            x: 600,
            y: 550
        }
        const feature2 = {
            src: 'bt-stop',
            onClick: this.onStopBtnPressed,
            visible: false,
            disable: false,
            x: 600,
            y: 550
        }
        this.btnStop = Button(feature2, this.add);
        this.btnSpin = Button(feature1, this.add);

        //music setup
        this.bgMusic = this.sound.add("bg_music", {loop: true});
        this.spinMusic = this.sound.add("spin_music", {loop: true});
        this.bgMusic.play();

        //centring screen
       // this.cameras.main.centerOn(400,300);
        this.createRandomRow();
        let text =this.add.text(300, 30, 'Secret Potion', {rotation: '45', textShadow: '2px 2px red',color: 'blue',fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',fontSize: '2rem' });
        text.angle=-3;

    }

//first setup
    createRandomRow() {
        const mat = [];
        const spinningCol = [];

        //creating random starting map
        for (let row = 0; row < ROW; row++) {
            let arr = [];
            for (let i = 0; i < COL; i++) {
                let temp = this.add.image(125 + i * IMG_SIZE, 140 + row * IMG_SIZE, SYMBOL_NAME + (getRandomInt(IMG_NUM) + 1));
                arr.push(temp);

            }
            mat.push(arr);
        }

        //creating is spinning for each col
        for (let i = 0; i < COL; i++) {
            spinningCol.push(false);
        }
        this.state.colNumSpin = spinningCol;
        this.itemsMat = mat;


    }

    //one new role
    shiftDown = (insert) => {
        const mat = [];
        if (this.state.isSpinning) {

            for (let i = 0; i < COL; i++) {
                if (this.state.colNumSpin[i]) {
                    this.itemsMat[2][i].destroy();
                    this.itemsMat[2][i] = this.itemsMat[1][i];
                    this.itemsMat[2][i].y += IMG_SIZE;
                    this.itemsMat[1][i] = this.itemsMat[0][i];
                    this.itemsMat[1][i].y += IMG_SIZE;

                    // if not given a result use random
                    if (insert) {
                        this.itemsMat[0][i] = this.add.image(125 + Number(i) * IMG_SIZE, IMG_SIZE, SYMBOL_NAME + (insert));
                    } else {
                        this.itemsMat[0][i] = this.add.image(125 + Number(i) * IMG_SIZE, IMG_SIZE, SYMBOL_NAME + (getRandomInt(IMG_NUM) + 1));

                    }


                }
            }

        }

    }


    update() {

    }

    // spinning mangement
    startSpin = () => {
        this.state.isSpinning = true;

        //setting timer for each col. 2 sec diff
        for (let i = 0; i < COL; i++) {
            this.state.colNumSpin[i] = true;

            this.state.timouts.push(setTimeout(() => this.stopCol(i)
                , 2000 + i * 1000));
        }
     
        let con = false;

        //loop to update status
        this.state.inter = setInterval(() => {
            if (this.state.isSpinning) {
                con = false;
                for (let i = 0; i < COL; i++) {
                    con = con || this.state.colNumSpin[i];
                }
                if (con) {
                    this.shiftDown();
                } else {
                    this.onStopHandler();

                }

            }
        }, 100);


    }

    stopCol = (index) => {
        this.state.colNumSpin[index] = false;
    }

    // onclick spin
    onSpinHandler = () => {
        this.bgMusic.stop();
        this.spinMusic.play();

        this.btnSpin.disableInteractive().setAlpha(0.5);
        this.state.isSpinning = true;

        //hide and replace buttons
        setTimeout(() => {
            this.btnSpin.setVisible(false);
            this.btnStop.setVisible(true).setInteractive();
        }, 1000);

        this.startSpin();


    }

    //stopping spinnning and reset state
    onStopHandler = () => {
        this.state.isSpinning = false;

        this.spinMusic.stop();
        this.bgMusic.play();

        this.btnStop.disableInteractive().setVisible(false);
        this.btnSpin.setInteractive().setAlpha(1).setVisible(true);

        //canel looping to update state
        if (this.state.inter) {
            clearInterval(this.state.inter);
        }
        //reset status
        for (let i = 0; i < COL; i++) {
            this.state.colNumSpin[i] = false;
        }

    }
        // onclikc stop => manually setting state
    onStopBtnPressed = () => {
        this.cancelTimouts();

        //shifting to he first row should be with ​ yellow ​ potions, second row with ​ red
//potions and third row with ​ purple ​ potions.
        this.shiftDown('4');
        this.shiftDown('3');
        this.shiftDown('1');
        this.onStopHandler();


    }
    //cancels all timouts to change state
    cancelTimouts(){
        while(this.state.timouts.length > 0){
            clearTimeout(this.state.timouts.pop());
        }
    }


}