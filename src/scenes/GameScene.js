import phaser from 'phaser';
import Button from '../components/Button';
const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude'
const SYMBOL_NAME = 'potion';
const COL = 5;
const ROW = 3;
const IMG_SIZE = 140;
const IMG_NUM = 3;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
export default class GameScene extends Phaser.Scene
{
    constructor() {
    
        super('game-scene');
        this.state = {
            isSpinning: false,
            colNumSpin: [],
            inter: null
        }
    }
    
    preload()
    {
        this.load.image('slotContainer', 'images/slotContainer.png')
        this.load.image(GROUND_KEY, 'images/platform.png')
        this.load.image('potion1', 'images/potion1.png')
        this.load.image('potion2', 'images/potion2.png')
        this.load.image('potion3', 'images/potion3.png')
        this.load.image('bomb', 'images/bomb.png')
        this.load.image('bg', 'images/bg-default.jpg');
        this.load.image('bt-spin', 'images/button_spin.png');
        this.load.image('bt-stop', 'images/button_stop.png');



        this.btnPressed = false;

        // this.load.spritesheet(DUDE_KEY,
        //     'images/dude.png',
        //     { frameWidth: 32, frameHeight: 48 }
        // )


    }
    create(){
        this.add.image(100, 100, 'bg')

        this.add.image(380, 250, 'slotContainer');
        this.btnStop =this.add.sprite(600,550,'bt-stop').setInteractive().setVisible(false);
         const feature1={
            src: 'bt-spin',
            onClick: this.onSpinHandler,
            visible: true,
            disable: false,
            x: 600,
            y: 550
        }
        const feature2={
            src: 'bt-stop',
            onClick: this.onStopHandler,
            visible: false,
            disable: false,
            x: 600,
            y: 550
        }

        this.btnStop = Button(feature2, this.add);
        this.btnSpin = Button(feature1,this.add);



        this.createRandomRow();


       // this.createPlatforms()
    }

     create_btn  (feature) {
    //     // const feature={
    //     //     src: src,
    //     //     onClick: onClick,
    //     //     visible: true,
    //     //     disable: false,
    //     //     x: x,
    //     //     y: y
    //     // }
    //     let btn =this.add.sprite(feature.x,feature.y,feature.src).setInteractive();
    //     btn.on('pointerdown',feature.onClick);
    //     btn.on('pointerover', function (event) {
    
    //         this.setTint(0xff0000);
    //         this.setScale(1.1);
    
    //     });
    
    
    // btn.on('pointerout', function (event) {
    
    //     this.clearTint();
    //     this.setScale(1);
    
    
    //     });
    
    
    //     return btn; 
    
    }
    createRandomRow() {
        const mat = [];
        const spinningCol =[];
       
        //creating random starting map
        for(let row = 0; row<ROW ;row++){
               let arr = [];
            for(let i =0; i<COL; i++){
              let temp=  this.add.image(125+i*IMG_SIZE,140+row*IMG_SIZE,SYMBOL_NAME+(getRandomInt(IMG_NUM)+1) );
                arr.push(temp);
                
            }
            mat.push(arr);
        }

        //ccreating is spinning for each col
        for(let i =0; i<COL; i++){
            spinningCol.push(false);
        }
        this.state.colNumSpin= spinningCol;
        this.itemsMat = mat;
       
       

    }
    shiftDown = () => {
        const mat = [];
        if(this.state.isSpinning){
    
            for(let i =0; i<COL ; i++){
                if(this.state.colNumSpin[i]){
                    this.itemsMat[2][i].destroy();
                    this.itemsMat[2][i] = this.itemsMat[1][i];
                    this.itemsMat[2][i].y+=  IMG_SIZE;
                    this.itemsMat[1][i] = this.itemsMat[0][i];
                    this.itemsMat[1][i].y+=  IMG_SIZE;
                    this.itemsMat[0][i] = this.add.image(125+Number(i)*IMG_SIZE,IMG_SIZE,SYMBOL_NAME+(getRandomInt(IMG_NUM)+1) );


                }
            }
          
            //this.itemsMat = mat;
        }
   
    }


    update() {
      
    }


    startSpin = () => {
        this.state.isSpinning = true;
        for(let i=0 ;i <COL ; i++ )
        {
            this.state.colNumSpin[i]=true;
            setTimeout(()=>this.stopCol(i)
            , 2000 +i*2000);
            console.log(2000 + i*2000);
        } 
        let con =false;
       this.state.inter= setInterval(() => {
            if(this.state.isSpinning){
                 con =false;
                for(let i=0 ;i <COL ; i++ ){
                    con = con ||this.state.colNumSpin[i];
                }
                if(con){
                    this.shiftDown(); 
                   console.log( this.state.colNumSpin);
                } else {
                    this.onStopHandler();
                    
                }
               // this.state.isSpinning = con;
    
            }
        }, 100);
    
       
      }

      stopCol=(index) => {
          this.state.colNumSpin[index] =false;
      }

    onSpinHandler= () => {
        this.btnSpin.disableInteractive().setAlpha(0.5);
        this.state.isSpinning=true;
        this.startSpin();
        setTimeout(()=>{
            this.btnSpin.setVisible(false);
            this.btnStop.setVisible(true);
        },1000);

    }

    onStopHandler = () => {
        this.state.isSpinning= false;
        this.btnStop.disableInteractive().setVisible(false);
        this.btnSpin.setInteractive().setAlpha(1).setVisible(true);
        if(this.state.inter){
            clearInterval(this.state.inter);
        }
        for(let i=0 ;i <COL ; i++ )
        {
            this.state.colNumSpin[i]=false;
        } 
        console.log('stop pressed');

    }


}