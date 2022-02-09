import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom();
loadSprite("mario", "./assets/mario.png")
loadSprite("block", "./assets/block.png")
loadSprite("portal", "./assets/portal.png")
loadSprite("enemy", "./assets/enemy.png")
loadSprite("shroom", "./assets/coin.png")
loadSprite("misterious", "./assets/misterious.png")
loadSprite("hard-block", "./assets/hard-block.png")
loadSprite("coin", "./assets/coin.png")
const mario = add([
    sprite('mario'),
    pos(20, 10 ),
    scale(2),
    area(),
    body(),
])
const SPEED = 320
onKeyPress("space", () => {
    mario.jump()
})
onKeyDown('right', () =>{
    mario.move(SPEED, 0)
})
onKeyDown('left', () =>{
    mario.move(-SPEED, 0)
})
mario.onCollide("coin", (coin) => {
    destroy(coin)
    play("score")
})
const level=addLevel([
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                        ',
        '                                                                                       ',
        '      ' ,
        '' ,
        '' ,

        '' ,
        '               0                                                                        ' ,
        '          =====?===               ==                                         ' ,
        '' ,
        '',
        '' ,
        '' ,
        '                                                        *   ' ,
        '==================================================    ============================================',
    ],
    {
        width: 20,
        height: 20,
        "=" : () => [
            sprite("block"),
            area(),
            solid(),
        ],
        "*" : ()=>[
            sprite("portal"),
            area(),
            solid(),
        ],
        "?" :()=>[
            sprite("misterious"),
            area(),
            solid(),
        ],
        "0" :()=>[
            sprite("coin"),
            "coin",
        ],
    }
)