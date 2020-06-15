import phaser from 'phaser';
const GROUND_KEY = 'ground';
const DUDE_KEY = 'dude'
const SYMBOL_NAME = 'potion';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
export default class GameScene extends Phaser.Scene
{
    constructor() {
        super('game-scene');
    }
    preload()
    {
        this.load.image('slotContainer', 'images/slotContainer.png')
        this.load.image(GROUND_KEY, 'images/platform.png')
        this.load.image('potion1', 'images/potion1.png')
        this.load.image('potion2', 'images/potion2.png')
        this.load.image('potion3', 'images/potion3.png')
        this.load.image('bomb', 'images/bomb.png')
        this.load.image('bg', 'images/bg-default.jpg')


        // this.load.spritesheet(DUDE_KEY,
        //     'images/dude.png',
        //     { frameWidth: 32, frameHeight: 48 }
        // )


    }
    create(){
        this.add.image(100, 100, 'bg')

        this.add.image(380, 250, 'slotContainer')
        this.createRandomRow();


       // this.createPlatforms()
    }
    createRandomRow() {
        const mat = [];
        // for(let row = 1; row<4 ;row++){
        //     const col = [];
        //     for(let i =0; i<5 ; i++){
        //         // this.add.image(125+i*140,row*140,SYMBOL_NAME+(getRandomInt(3)+1));
        //         col.push(getRandomInt(3)+1);
        //     }
        // }

       //  for(let row = 0; row<3 ;row++){
       //      const col = [];
       //      for(let i =0; i<5; i++){
       //          // this.add.image(125+i*140,row*140,SYMBOL_NAME+(getRandomInt(3)+1));
       //          col.push(getRandomInt(3)+1);
       //      }
       //      mat.push(col);
       //  }
       // // console.log(mat);

        for(let row = 0; row<3 ;row++){
               let arr = [];
            for(let i =0; i<5; i++){
                // this.add.image(125+i*140,row*140,SYMBOL_NAME+(getRandomInt(3)+1));
              let temp=  this.add.image(125+i*140,140+row*140,SYMBOL_NAME+(getRandomInt(3)+1) );
            //  console.log(temp);
                arr.push(temp);
            }
            mat.push(arr);
            //console.log(arr);
        }
        console.log(mat[0][0]);
        console.log(this);
        this.itemsMat = mat;
        // for(let row in mat){
        //     for(let i in mat[row]){
        //         console.log(mat[row][i]);
        //
        //     }
        // }
        setTimeout(()=> {
            this.shiftDown();
        },3000);
       

    }
    shiftDown = () => {
        for(let row in this.itemsMat ){
            for(let col in this.itemsMat[row]){
                if(Number(row) <2){
                    this.itemsMat[row][col].y+=140
                    if(Number(row) == 0){
                        this.itemsMat[row][col]=this.add.image(125+Number(col)*140,140,SYMBOL_NAME+(getRandomInt(3)+1) );

                    }
                } else {
                    this.itemsMat[row][col].destroy();
                }
            }
        }
    }

    createPlatforms()
    {
        const platforms = this.physics.add.staticGroup()

        // platforms.create(400, 568, GROUND_KEY).setScale(2).refreshBody()
        //
        // platforms.create(600, 400, GROUND_KEY)
        // platforms.create(50, 250, GROUND_KEY)
        // platforms.create(750, 220, GROUND_KEY)
        this.createPlayer();
    }

    createPlayer()
    {
        this.player = this.physics.add.sprite(100, 450, DUDE_KEY)
        this.player.setBounce(0.2)
        this.player.setCollideWorldBounds(true)

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: [ { key: DUDE_KEY, frame: 4 } ],
            frameRate: 20
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(DUDE_KEY, { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
    }

    update() {
      //
      //   while (true){
      //       setTimeout(console.log(this.itemsMat),1000);
      //   }
    }


}