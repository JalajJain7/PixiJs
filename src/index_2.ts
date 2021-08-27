import { Application, Graphics, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480,
	antialias:true
});

const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;




app.stage.addChild(clampy);
const graphy: Graphics = new Graphics();

// we give instructions in order. begin fill, line style, draw circle, end filling
graphy.beginFill(0xFF00FF);
graphy.lineStyle(10, 0x00FF00);
graphy.drawCircle(0, 0, 25); // See how I set the drawing at 0,0? NOT AT 100, 100!
graphy.endFill();

app.stage.addChild(graphy); //I can add it before setting position, nothing bad will happen.
let g= new Graphics();
g.beginFill(0xFFFFFF);
g.drawRect(0,0,100,100);
g.position.x=100;

app.stage.addChild(g);

var car=new Graphics();
car.beginFill(0xFF00FF);
car.lineStyle(2, 0xFEEB77, 1);
car.drawRect(0,0,200,100);

var wheel1=new Graphics();
wheel1.beginFill(0x111111);
wheel1.lineStyle(2, 0xFEEB77, 1);
wheel1.drawCircle(25,25,25);
wheel1.moveTo(25,25);
wheel1.lineTo(50,25);
wheel1.moveTo(25,25);
wheel1.lineTo(25,0);
wheel1.moveTo(25,25);
wheel1.lineTo(25,50);
wheel1.moveTo(25,25);
wheel1.lineTo(0,25);
wheel1.pivot.set(25,25);
wheel1.position.set(30,90);
var wheel2=new Graphics();
wheel2.beginFill(0x111111);
wheel2.lineStyle(2, 0xFEEB77, 1);
wheel2.drawCircle(25,25,25);
wheel2.moveTo(25,25);
wheel2.lineTo(50,25);
wheel2.pivot.set(25,25);
wheel2.position.set(170,90);

car.addChild(wheel1);
car.addChild(wheel2);
car.position.set(300,200);

app.stage.addChild(car);
const v=1;
const w=0.04;//v should be equal to wr to resist the slipping
car.position.x=0;



createListener(wheel1);
createListener(wheel2);
let r=0;
app.ticker.add(function(){
	r+0.2;if(r>100)r=0;
	car.position.x+=v;
	wheel1.rotation+=w;
	wheel2.rotation+=w;
	//car.clear();
	car.beginFill(0xFF00FF);
	car.lineStyle(2, 0xFEEB77, 1);
	car.drawRect(0,0,200,100);
	car.drawCircle(0,0,r);
	if(car.position.x>500)car.position.x=0;
})


function createListener(obj){
	obj.interactive=true;
	obj.buttonMode=true;

	obj.on("pointerdown",()=>{
		obj.tint=0x222222;
	});
	obj.on("pointerup",()=>{
		obj.tint=0x555555;
	});
	obj.on("pointerover",()=>{
		obj.tint=0xFF0000;
	});
	obj.on("pointerout",()=>{
		obj.tint=0xFFFFFF;
	});
	obj.on("click",()=>{
		console.log(obj);
	})
}









