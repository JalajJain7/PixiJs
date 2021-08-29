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

var field=new Graphics();
field.lineStyle(1, 0xFEEB77, 1);

function arrow(val_x,val_y,m){
var m1=(m-1)/(m+1);
var px=0;
var py=0;
if(m>-1){
    px=val_x+5*(1/Math.pow(1+Math.pow(m1,2),1/2));
     py=val_y+5*(m1/Math.pow(1+Math.pow(m1,2),1/2));
}
else{
     px=val_x+5*(1/Math.pow(1+Math.pow(m1,2),1/2));
     py=val_y-5*(m1/Math.pow(1+Math.pow(m1,2),1/2));
}

field.lineTo(px,py);
field.moveTo(val_x,val_y);
var m2=(1+m)/(1-m);
if(m>1)
{
     px=val_x+5*(1/Math.pow(1+Math.pow(m2,2),1/2));
     py=val_y-5*(m2/Math.pow(1+Math.pow(m2,2),1/2));
}
else{
    px=val_x+5*(1/Math.pow(1+Math.pow(m2,2),1/2));
    py=val_y+5*(m2/Math.pow(1+Math.pow(m2,2),1/2));
}

field.lineTo(px,py);
field.moveTo(val_x,val_y);
}



function fieldlines(){
var i=0;
for(i=0;i<=40;i++){

    var v1_x=north_x-1;
    if(i>9&&i<=29)
    {
        var v1_y=h2-50+49+((i-9)*0.1);
    }
    else if(i<=9){
        var v1_y=h2-50+40+i;
    }
    else{
        var v1_y=h2-50+51+(i-30);
    }

// var cons=100;
// const south_v=new Vector2(south_x,south_y);//south pole vector
// const north_v=new Vector2(north_x,north_y);//north pole vector

//above two cordinates is the nearby point of north pole from where the line should start

//app.ticker.add(function(){
    var counter=0;

    var p=new Vector2(v1_x,v1_y);
    field.moveTo(p.x,p.y);//making the line
    var stopper=0;
	while(true){
        if(counter++>300||0>=p.x||p.x>=2*window.innerWidth||-400>=p.y||p.y>=2*window.innerHeight||p.x>w2)
        {
            break;
        }
        
        
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

        var q=new Vector2(south_v_p.x+north_v_p.x,south_v_p.y+north_v_p.y);
        q.normalize();

       // console.log(p);
        //let dl = 1 pixel

        
         var coso=q.x;//m/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector
         var sino=q.y;//1/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector

         var v2_x=p.x+coso*10;//finding the point nearby along the vector
         var v2_y=p.y+sino*10;//finding the point nearby along the vector
        //var v=new Vector2(0,0);
        //v.addVectors(p,q);
 
        var m=sino/coso;
       
        field.lineTo(v2_x,v2_y);//making the line
        if(stopper==0&&(Math.pow(Math.pow(v2_x-w2,2)+Math.pow(v2_y-h2,2),1/2)>=(h2))){
            arrow(v2_x,v2_y,m);
            stopper++;
        }
        
        p.set(v2_x,v2_y);
      
    }
    var v1_x=south_x+1;
    if(i>9&&i<=29)
    {
        var v1_y=h2-50+49+((i-9)*0.1);
    }
    else if(i<=9){
        var v1_y=h2-50+40+i;
    }
    else{
        var v1_y=h2-50+51+(i-30);
    }
 counter=0;
stopper=0;
 p.set(v1_x,v1_y);
field.moveTo(p.x,p.y);//making the line
while(true){
    if(counter++>300||0>=p.x||p.x>=2*window.innerWidth||-400>=p.y||p.y>=2*window.innerHeight||p.x<w2)
    {
        break;
    }
    
    
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

    var q=new Vector2(south_v_p.x+north_v_p.x,south_v_p.y+north_v_p.y);
    q.normalize();

   // console.log(p);
    //let dl = 1 pixel

    
     var coso=q.x;//m/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector
     var sino=q.y;//1/Math.pow(1+Math.pow(m,2),1/2);//finding the point nearby along the vector

     var v2_x=p.x-coso*10;//finding the point nearby along the vector
     var v2_y=p.y-sino*10;//finding the point nearby along the vector
    //var v=new Vector2(0,0);
    //v.addVectors(p,q);

    var m=sino/coso;
    field.lineTo(v2_x,v2_y);//making the line
    if(stopper==0&&(Math.pow(Math.pow(v2_x-w2,2)+Math.pow(v2_y-h2,2),1/2)>=(h2))){
        arrow(v2_x,v2_y,m);
        stopper++;
    }
    p.set(v2_x,v2_y);

}

//})

}
}
const needle:PIXI.Sprite=PIXI.Sprite.from("compass-needle.png");
needle.anchor.set(0.5);
// needle.height=200;
// needle.width=166.66;

// viewport.addChild(clampy);

app.stage.on('click',moveneedle);

function moveneedle(e){
    let pos=e.data.global;
    needle.x=pos.x;
    needle.y=pos.y;
}
viewport.addChild(field);
viewport.addChild(needle);
fieldlines();