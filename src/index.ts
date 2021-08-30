import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
import { Graphics, PI_2 } from 'pixi.js'
import { Vector2 } from './vector'
import {Pane} from 'tweakpane';

const app = new PIXI.Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
    backgroundColor: 0x6495ed,
    width:window.innerWidth,
    height:window.innerHeight,
    antialias:true
})

app.stage.interactive=true;

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

var south_x=w2+200;//this is the extreme x cordinate of southpole
var south_y=h2;//this is the extreme y cordinate of south pole
var north_x=w2-200;//this is the extreme x cordinate of north pole
var north_y=h2;//this is the extreme y cordinate of north pole

//the above co ordinates is obtained because we are workin acc to the point particle

var cons=100;
const south_v=new Vector2(south_x,south_y);//south pole vector
const north_v=new Vector2(north_x,north_y);//north pole vector
var q=new Vector2(0,0);//field lines resultant vector
var compass_vector=new Vector2(0,-1);//vector of compass
var p=new Vector2(0,0);

var field=new Graphics();
field.lineStyle(1, 0xFEEB77, 1);

function arrow(val_x,val_y,r_v_x,r_v_y){

    var q=new Vector2(-r_v_x,-r_v_y);
    var q_p_p=new Vector2(-r_v_y,r_v_x);
    var q_p_n=new Vector2(r_v_y,-r_v_x);
    var f_a=new Vector2(q.x+q_p_p.x,q.y+q_p_p.y);
    var s_a=new Vector2(q.x+q_p_n.x,q.y+q_p_n.y);

    f_a.normalize();
    s_a.normalize();

    var coso=f_a.x;
    var sino=f_a.y;

    field.lineTo(val_x+5*coso,val_y+5*sino);
    field.moveTo(val_x,val_y);

    coso=s_a.x;
    sino=s_a.y;

    field.lineTo(val_x+5*coso,val_y+5*sino);
    field.moveTo(val_x,val_y);

}

function fieldlines_calculator(p){

    var south_mag=cons/south_v.distanceToSquared(p);//constant that have to be multiplied with vector
    var north_mag=cons/north_v.distanceToSquared(p);//constant that have to be multiplied with vector

    var south_v_p=new Vector2(south_x-p.x,south_y-p.y);//vector from the nearby point tosouth pole
    south_v_p.normalize();//sets to unit vector
    south_v_p.setLength(south_mag);//setting length of vector
    // south_v_p.negate();

    var north_v_p=new Vector2(p.x-north_x,p.y-north_y);//vector from the nearby point to north pole
    north_v_p.normalize();//setting to unit
    north_v_p.setLength(north_mag);//setting the length 
    // north_v_p.negate();

    q.set(south_v_p.x+north_v_p.x,south_v_p.y+north_v_p.y);
    q.normalize();
}

function fieldlines(){

    // field.clear();

    let N=Math.floor(PARAMS.intensity);
    let dTh=2*Math.PI/N;

    for(let th=0;th<=Math.PI*2;th+=dTh){
        
        var v1_x=north_x+10*Math.cos(th);
        var v1_y=north_y+10*Math.sin(th);
        
        var counter=0;
        var stopper=0;
        var stopper_1=0;

        var v2_x=0;
        var v2_y=0;

        p.set(v1_x,v1_y);

        field.moveTo(p.x,p.y);//making the line
    
        while(true){

            if(counter++>300||0>=p.x||p.x>=2*window.innerWidth||-400>=p.y||p.y>=2*window.innerHeight||p.x>w2)
            {
                break;
            }
            
            fieldlines_calculator(p);

            var coso=q.x;//m/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector
            var sino=q.y;//1/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector

            v2_x=p.x+coso*10;//finding the point nearby along the vector
            v2_y=p.y+sino*10;//finding the point nearby along the vector
            //var v=new Vector2(0,0);
            //v.addVectors(p,q);
    
        
            field.lineTo(v2_x,v2_y);//making the line

            if(stopper==0&&(Math.pow(Math.pow(v2_x-w2,2)+Math.pow(v2_y-h2,2),1/2)>=(h2))){
                arrow(v2_x,v2_y,q.x,q.y);
                stopper++;
            }
        
            if(stopper_1==0&&v2_x>=w2)
            {
                arrow(v2_x,v2_y,q.x,q.y);
                stopper_1++;
            }

            p.set(v2_x,v2_y);
        
        }

        v1_x=south_x+10*Math.cos(th);
        v1_y=south_y+10*Math.sin(th);
        
        counter=0;
        stopper=0;

        p.set(v1_x,v1_y);

        field.moveTo(p.x,p.y);//making the line

        while(true){

            if(counter++>300||0>=p.x||p.x>=2*window.innerWidth||-400>=p.y||p.y>=2*window.innerHeight||p.x<w2)
            {
                break;
            }

            fieldlines_calculator(p);
        
            var coso=q.x;//m/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector
            var sino=q.y;//1/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector

            v2_x=p.x-coso*10;//finding the point nearby along the vector
            v2_y=p.y-sino*10;//finding the point nearby along the vector

            field.lineTo(v2_x,v2_y);//making the line

            if(stopper==0&&(Math.pow(Math.pow(v2_x-w2,2)+Math.pow(v2_y-h2,2),1/2)>=(h2)))
            {
                arrow(v2_x,v2_y,q.x,q.y);
                stopper++;
            }

            p.set(v2_x,v2_y);

        }
    }
}
const needle:PIXI.Sprite=PIXI.Sprite.from("compass-needle.png");
needle.anchor.set(0.5);

// needle.height=200;
// needle.width=166.66;

// viewport.addChild(clampy);

app.stage.on('click',moveneedle);

function moveneedle(e)
{
    let pos=e.data.global;
    needle.x=pos.x;
    needle.y=pos.y;
    p.set(needle.x,needle.y);
    fieldlines_calculator(p);
    var theta=q.angel_between(compass_vector);
    needle.rotation=theta;
    compass_vector.set(q.x,q.y);
}

viewport.addChild(field);
viewport.addChild(needle);

const PARAMS = {
    intensity: 50,
    background: {r: 255, g: 127, b: 0}
  };

fieldlines();

const pane = new Pane();

const f = pane.addFolder({
    title: 'Title',
    expanded: true,
  });
  
  f.addInput(PARAMS, 'intensity',{
      max:100,
      min:30,
      step:2
  }).on('change', (ev) => {
      field.clear();
      field.lineStyle(1, 0xFEEB77, 1);
    fieldlines();
  });;
  f.addInput(PARAMS, 'background');