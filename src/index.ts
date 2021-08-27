import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Graphics } from 'pixi.js'
import { Vector2 } from './vector'

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

// const sprite = viewport.addChild(new PIXI.Sprite(PIXI.Texture.WHITE))
// sprite.tint = 0xff0000
// sprite.width = sprite.height = 100
// sprite.position.set(100, 100)
const clampy: PIXI.Sprite = PIXI.Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;
// viewport.addChild(clampy);

var w=(window.innerWidth/2)-200;
var h=(window.innerHeight/2)-50;
var w2=window.innerWidth/2;

var south_pole=new Graphics();
south_pole.beginFill(0xff0000);
south_pole.drawRect(w,h,200,100);
viewport.addChild(south_pole);
var north_pole=new Graphics();
north_pole.beginFill(0x2211ad);
north_pole.drawRect(w2,h,200,100);
viewport.addChild(north_pole);

let text_1 = new PIXI.Text('S',{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
text_1.position.set(w+355,h+25);
north_pole.addChild(text_1);
let text_2 = new PIXI.Text('N',{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
text_2.position.set(w+25,h+25);
south_pole.addChild(text_2);

var b=Vector2.prototype.width;
var a=String(b);
let text_3 = new PIXI.Text(a,{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
viewport.addChild(text_3);