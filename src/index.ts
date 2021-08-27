import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'

const app = new PIXI.Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    backgroundColor: 0x6495ed,
    width:window.innerWidth,
    height:window.innerHeight,
    antialias:true
})


const viewport = new Viewport({
    // screenWidth: window.innerWidth,
    // screenHeight: window.innerHeight,
    worldWidth: 100,
    worldHeight: 100,

    interaction: app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
})
app.stage.addChild(viewport)
viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()

const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
sprite.tint = 0xff0000
sprite.width = sprite.height = 100
sprite.position.set(100, 100)
const clampy: PIXI.Sprite = PIXI.Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;
viewport.addChild(clampy);