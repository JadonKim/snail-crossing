namespace SpriteKind {
    export const UncollectedBerry = SpriteKind.create()
    export const CollectedBerry = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.y -= 16
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.x -= 16
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    sprite.startEffect(effects.ashes, 200)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.x += 16
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    snail.y += 16
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileGrass2, function (sprite, location) {
    if (heldBerry != null) {
        tiles.placeOnTile(heldBerry, location)
        heldBerry.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        heldBerry = null
music.baDing.play()
        snail.startEffect(effects.confetti, 250)
        if (berriesleft == 0) {
            game.over(true)
        }
    }
})
function spawnBerries (numBerries: number, startColumn: number, startRow: number, gap: number) {
    for (let index = 0; index < numBerries; index++) {
        berry = sprites.create(img`
            . . . . . . . . . . . 6 6 6 6 6 
            . . . . . . . . . 6 6 7 7 7 7 8 
            . . . . . . 8 8 8 7 7 8 8 6 8 8 
            . . e e e e c 6 6 8 8 . 8 7 8 . 
            . e 9 5 4 9 e c 8 . . . 6 7 8 . 
            e 9 4 9 9 9 9 9 c . . . 6 7 8 . 
            e 9 9 9 9 9 9 9 c . . . 8 6 8 . 
            e 9 e e 9 9 9 9 e e e e c 6 8 . 
            c 9 e e 9 9 9 9 e 9 5 4 9 c 8 . 
            . c 9 e e e 9 e 9 4 9 9 9 9 c . 
            . . c 9 9 9 e e 9 9 9 9 9 9 9 e 
            . . . e c c e c 9 9 9 9 9 9 9 e 
            . . . . . . . c 9 e e 9 9 e 9 c 
            . . . . . . . c e e e e e e 9 c 
            . . . . . . . . c e 9 9 9 9 c . 
            . . . . . . . . . c c c c c . . 
            `, SpriteKind.UncollectedBerry)
        tiles.placeOnTile(berry, tiles.getTileLocation(startColumn, startRow))
        startColumn += 1 + gap
        berry.z = -1
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.UncollectedBerry, function (sprite, otherSprite) {
    if (heldBerry == null) {
        heldBerry = otherSprite
        otherSprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        otherSprite.setKind(SpriteKind.CollectedBerry)
        berriesleft += 0 - 1
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy(effects.starField, 200)
})
let leftcar: Sprite = null
let rightcar: Sprite = null
let startColumn = 0
let berry: Sprite = null
let berriesleft = 0
let heldBerry: Sprite = null
let snail: Sprite = null
berriesleft = 4
tiles.setTilemap(tilemap`level1`)
scene.setBackgroundColor(7)
snail = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . c c . . . 
    . . . . . . . c c c c 6 3 c . . 
    . . . . . . c 6 3 3 3 3 6 c . . 
    . . c c . c 6 c c 3 3 3 3 3 c . 
    . c 5 5 c 6 c 5 5 c 3 3 3 3 3 c 
    . f f 5 c 6 c 5 f f 6 3 3 3 c c 
    . f f 5 3 c 3 5 f f 6 6 6 6 c c 
    . . b 5 5 3 5 5 c 3 3 3 3 3 3 c 
    . c c 5 5 5 5 5 b c c 3 3 3 3 c 
    c 5 5 4 5 5 5 4 b 5 5 c 3 3 c . 
    b 5 4 b 4 4 4 4 b b 5 c b b . . 
    c 5 5 5 c 4 c 5 5 5 c 4 c 5 c . 
    c 5 5 5 5 c 5 5 5 5 c 4 c 5 c . 
    . c c c c c c c c c . . c c c . 
    `, SpriteKind.Player)
tiles.placeOnTile(snail, tiles.getTileLocation(5, 16))
scene.cameraFollowSprite(snail)
snail.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
spawnBerries(4, 2, 1, 1)
game.onUpdateInterval(500, function () {
    rightcar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . 2 2 2 2 2 2 2 2 . . . . 
        . . . 2 4 2 2 2 2 2 2 c 2 . . . 
        . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
        . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
        . 2 c 2 e e e e e e e b c 4 2 2 
        . 2 2 e b b e b b b e e b 4 2 2 
        . 2 e b b b e b b b b e 2 2 2 2 
        . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
        . e e e e e e f e e e f e 2 d d 
        . e e e e e e f e e f e e e 2 d 
        . e e e e e e f f f e e e e e e 
        . e f f f f e e e e f f f e e e 
        . . f f f f f e e f f f f f e . 
        . . . f f f . . . . f f f f . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    leftcar = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 6 6 6 6 6 6 6 6 . . 
        . . . . . 6 c 6 6 6 6 6 6 9 6 . 
        . . . . 6 c c 6 6 6 6 6 6 9 c 6 
        . . d 6 9 c c 6 9 9 9 9 9 9 c c 
        . d 6 6 9 c b 8 8 8 8 8 8 8 6 c 
        . 6 6 6 9 b 8 8 b b b 8 b b 8 6 
        . 6 6 6 6 6 8 b b b b 8 b b b 8 
        . 6 6 6 6 8 6 6 6 6 6 8 6 6 6 8 
        . 6 d d 6 8 f 8 8 8 f 8 8 8 8 8 
        . d d 6 8 8 8 f 8 8 f 8 8 8 8 8 
        . 8 8 8 8 8 8 8 f f f 8 8 8 8 8 
        . 8 8 8 8 f f f 8 8 8 8 f f f f 
        . . . 8 f f f f f 8 8 f f f f f 
        . . . . f f f f . . . . f f f . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    tiles.placeOnRandomTile(rightcar, sprites.vehicle.roadHorizontal)
    tiles.placeOnRandomTile(leftcar, assets.tile`myTile`)
    rightcar.setVelocity(randint(50, 100), 0)
    leftcar.setVelocity(randint(-100, -50), 0)
    rightcar.setFlag(SpriteFlag.DestroyOnWall, true)
    leftcar.setFlag(SpriteFlag.DestroyOnWall, true)
    rightcar.x = -20
    leftcar.x = 180
})
