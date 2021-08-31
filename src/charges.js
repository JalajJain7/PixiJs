import { Vector2 } from './vector'
class charges {

	constructor( xn = 0,xs=0, y = 0 ) {

		this.xn = xn;
        this.xs=xs;
		this.y = y;

	}

    field(p){

        const south_v=new Vector2(this.xs,this.y);//south pole vector
        const north_v=new Vector2(this.xn,this.y);//north pole vector
        var q=new Vector2(0,0);//field lines resultant vector
        var cons=100;

        var south_mag=cons/south_v.distanceToSquared(p);//constant that have to be multiplied with vector
        var north_mag=cons/north_v.distanceToSquared(p);//constant that have to be multiplied with vector

        var south_v_p=new Vector2(this.xs-p.x,this.y-p.y);//vector from the nearby point tosouth pole
        south_v_p.normalize();//sets to unit vector
        south_v_p.setLength(south_mag);//setting length of vector
        // south_v_p.negate();

        var north_v_p=new Vector2(p.x-this.xn,p.y-this.y);//vector from the nearby point to north pole
        north_v_p.normalize();//setting to unit
        north_v_p.setLength(north_mag);//setting the length 
        // north_v_p.negate();

        q.set(south_v_p.x+north_v_p.x,south_v_p.y+north_v_p.y);
        q.normalize();

        return q;

    }
}

charges.prototype.isVector2 = true;

export { charges };