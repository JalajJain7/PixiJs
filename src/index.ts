import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Graphics, PI_2 } from 'pixi.js'
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
    worldWidth: 1000,
    worldHeight: 1000,

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
//the above variables is added is as per to add magnet at center 
var south_pole=new Graphics();
south_pole.beginFill(0xff0000);
south_pole.drawRect(w,h,200,100);
viewport.addChild(south_pole);
//above was for south opole rectangle
var north_pole=new Graphics();
north_pole.beginFill(0x2211ad);
north_pole.drawRect(w2,h,200,100);
viewport.addChild(north_pole);
//above was for north pole rectangle
let text_1 = new PIXI.Text('S',{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
text_1.position.set(w+355,h+25);
north_pole.addChild(text_1);
//above is for 's'  written on bar
let text_2 = new PIXI.Text('N',{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
text_2.position.set(w+25,h+25);
south_pole.addChild(text_2);
//above is for 'n'  written on bar
var b=new Vector2(0,0);
var k=b.width;
var a=String(k);
let text_3 = new PIXI.Text(a,{fontFamily : 'Arial', fontSize: 34, fill : 0x1d1c1c, align : 'center'});
viewport.addChild(text_3);
//above is for testing wether the vectors module is working or not
var south_x=w2+200;//this is the extreme x cordinate of southpole
var south_y=h2;//this is the extreme y cordinate of south pole
var north_x=w2-200;//this is the extreme x cordinate of north pole
var north_y=h2;//this is the extreme y cordinate of north pole
//the above co ordinates is obtained because we are workin acc to the point particle
var v1_x=north_x-1;
var v1_y=h2-50;
var cons=100;
//above two cordinates is the nearby point of north pole from where the line should start
var field=new Graphics();
field.lineStyle(1, 0xFEEB77, 1);
app.ticker.add(function(){
	while(true){
        if(v2_x>=w2||0>=v2_x||v2_x>=window.innerWidth||0>=v2_y||v2_y>=window.innerHeight)
        {
            break;
        }
        var p=new Vector2(v1_x,v1_y);//this is the vector of nearby point
        var south_v=new Vector2(south_x,south_y);//south pole vector
        var south_mag=cons/Math.pow(south_v.distanceTo(p),3);//constant that have to be multiplied with vector

        var north_v=new Vector2(north_x,north_y);//north pole vector
        var north_mag=cons/Math.pow(north_v.distanceTo(p),3);//constant that have to be multiplied with vector
        var south_v_p=new Vector2(south_x-v1_x,south_y-v1_y);//vector from the nearby point tosouth pole
        south_v_p.normalize();//sets to unit vector
        south_v_p.setLength(south_mag);//setting length of vector
        var north_v_p=new Vector2(v1_x-north_x,v1_y-north_y);//vector from the nearby point to north pole
        north_v_p.normalize();//setting to unit
        north_v_p.setLength(north_mag);//setting the length 
        var q=new Vector2(0,0);
        q.addVectors(south_v_p,north_v_p);//adding both vectors
        q.normalize();
        //let dl = 1 pixel
        var m=q.height/q.width;//finding the slope of unit vector
        var sino=m/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector
        var coso=1/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector
        var v2_x=v1_x-coso;//finding the point nearby along the vector
        var v2_y=v1_y-sino;//finding the point nearby along the vector
        field.moveTo(v1_x,v1_y);//making the line
        field.lineTo(v2_x,v2_y);//making the line
        v1_x=v2_x;//assigning p=q
        v1_y=v2_y;//assigning p=q
        
    }
})
viewport.addChild(field);