import phaser from 'phaser';

const Button = (feature, add) => {
    // const feature={
    //     src: src,
    //     onClick: onClick,
    //     visible: true,
    //     disable: false,
    //     x: x,
    //     y: y
    // }
    const btn =add.sprite(feature.x,feature.y,feature.src).setInteractive().setVisible(feature.visible);
    btn.on('pointerdown',feature.onClick);
    btn.on('pointerover',  (event) =>{

        btn.setTint(0xff0000);
        btn.setScale(1.1);

    });


btn.on('pointerout',  (event) => {

    btn.clearTint();
    btn.setScale(1);


    });


    return btn; 

}

export default Button;