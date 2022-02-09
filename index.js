import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";



kaboom();
//loading images
loadSprite("mario", "./assets/mario.png")
loadSprite("block", "./assets/block.png")
loadSprite("portal", "./assets/portal.png")
loadSprite("enemy", "./assets/enemy.png")
loadSprite("shroom", "./assets/coin.png")
loadSprite("mysterious", "./assets/misterious.png")
loadSprite("hard-block", "./assets/hard-block.png")
loadSprite("coin", "./assets/coin.png")


//loading sounds
loadSound("powerup", "./assets/powerup.mp3")
loadSound("score", "./assets/score.mp3")
loadSound("lose", "./assets/lose.mp3")

scene("game", () => {
    //speed 
    const SPEED = 320
    //falling death 
    const FALL_DEATH = 2400
    //gravity
    gravity(2400);
    const level = addLevel([
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
        '      ',
        '',
        '',

        '',
        '               0                                                                        ',
        '          =====?===               ==                                         ',
        '',
        '',
        '',
        '',
        '                                                        *   ',
        '==================================================    ============================================',
    ], {
        width: 20,
        height: 20,
        "=": () => [
            sprite("block"),
            area(),
            solid(),
        ],
        "*": () => [
            sprite("portal"),
            area(),
            solid(),
        ],
        "?": () => [
            sprite("mysterious"),
            area(),
            solid(),
        ],
        "0": () => [
            sprite("coin"),
            area(),
            "coin",
        ],
    }
    )
    let score = 0;
    const scoreLabel = add([
        text(score),
        pos(24, 24)
    ])
    const mario = add([
        sprite('mario'),
        pos(20, 10),
        scale(2),
        area(),
        body(),
    ])
    onKeyPress("space", () => {
        mario.jump()
    })
    onKeyDown('right', () => {
        mario.move(SPEED, 0)
    })
    onKeyDown('left', () => {
        mario.move(-SPEED, 0)
    })
    // eating coins
    mario.onCollide("coin", (coin) => {
        //destroy coin and update score
        score++;
        scoreLabel.text = score
        destroy(coin)
        play("score")
    })
    mario.onCollide("portal", () => {
        shake(),
        go("win")
    })

    //checking death , arriving at portal
    mario.onUpdate(() => {
        if (mario.pos.y >= FALL_DEATH) {
            go("lose")
        }
    })

})


scene("lose", () => {
    add([
        text("Game Over"),
        pos(center()),
        origin("center"),
    ])
    onKeyPress("space", () => go("game"));
})
scene("win", () => {
    add([
        text("you won!!!"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        origin("center"),
    ])
    onKeyPress("space", () => go("game"));
})

go("game")