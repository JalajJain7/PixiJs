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
var h2=window.innerHeight/2;

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
var b=new Vector2(0,0);
var k=b.width;
var a=String(k);
let text_3 = new PIXI.Text(a,{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
viewport.addChild(text_3);
var south_x=w2+200;
var south_y=h2-50;
var north_x=w2-200;
var north_y=h2-50;
var v1_x=north_x-0.1;
var v1_y=h2;
var field=new Graphics();
field.lineStyle(1, 0xFEEB77, 1);
app.ticker.add(function(){
	while(true){
        var p=new Vector2(v1_x,v1_y);
        var south_v=new Vector2(south_x-v1_x,south_y-v1_y);
        var north_v=new Vector2(v1_x-north_x,v1_y-north_y);
        var v=new Vector2(0,0);
        v.addVectors(south_v,north_v);
        v.normalize();
        var q=new Vector2(0,0);
        q.addVectors(p,v);
        var m=q.height/q.width;
        var sino=m/Math.pow(1+Math.pow(m,2),1/2);
        var coso=1/Math.pow(1+Math.pow(m,2),1/2);
        var v2_x=v1_x-coso;
        var v2_y=v1_y-sino;
        field.moveTo(v1_x,v1_y);
        field.lineTo(v2_x,v2_y);
        v1_x=q.width;
        v1_y=q.height;
        if(q.height>(h2-50))
        {
            break;
        }
    }
})