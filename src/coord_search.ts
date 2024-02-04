window.addEventListener("load", (event) => {

	let asteroid = new Asteroid(); 

	let probe1 = new Probe(createRandomCoord(), asteroid); 
	let probe2 = new Probe(createRandomCoord(), asteroid,); 
	let probe3 = new Probe(createRandomCoord(), asteroid,); 


	console.log("Probes:");
	console.log(probe1)
	console.log(probe2)
	console.log(probe3)
	console.log("Asteroid: ");
	console.log(asteroid); 

	console.log("Possible asteroid location: ");
	console.log(intersect3spheres(probe1.position.x,probe2.position.x,probe3.position.x,
    probe1.position.y,probe2.position.y,probe3.position.y,
    probe1.position.z,probe2.position.z,probe3.position.z,
    probe1.distance,probe2.distance,probe3.distance
    ))
  });

function createRandomCoord(){
    return new Vector3(
		getRandomNumber(0,100),
        getRandomNumber(0,100),
        getRandomNumber(0,100)
	) as Vector3;
}

function getRandomNumber(min:number, max:number) {
	return Math.floor(Math.random() * (max - min) + min);
}

function intersect3spheres(x1 :any, x2:any, x3:any, y1:any, y2:any, y3:any, z1:any, z2:any, z3:any, r1:any, r2:any, r3:any) {

	var a1, b1, c1, k1, a3, b3, c3, k3, a31, b31, 
		e, f, g, h, A, B, C, x, y, z, x_, y_, z_, rootD;
/*
	Three spheres:
	EQ1: (x1 - x)^2 + (y1 - y)^2 + (z1 - z)^2 = r1^2
	EQ2: (x2 - x)^2 + (y2 - y)^2 + (z2 - z)^2 = r2^2
	EQ3: (x3 - x)^2 + (y3 - y)^2 + (z3 - z)^2 = r3^2	
	
	1. Pick one of the equations (EQ2) and subtract it from the other two (EQ1, EQ3).
	That will make those other two equations into linear equations in the three unknowns.  
*/
	
	// Subtract EQ2 from EQ1, move all constants to right side
	// Call the right side constant k1
	k1 = r1 * r1 - r2 * r2 - x1 * x1 + x2 * x2 - y1 * y1 + y2 * y2 - z1 * z1 + z2 * z2;
	
	// Left side of EQ1 is of the form a1x + b1y + c1z
	// where a1, b1, and c1 are the coefficients	
	a1 = 2 * (x2 - x1);
	b1 = 2 * (y2 - y1);	
	c1 = 2 * (z2 - z1);	
	
	// Subtract EQ2 from EQ3, move all constants to right side
	// Call the right side constant k3
	k3 = r3 * r3 - r2 * r2 - x3 * x3 + x2 * x2 - y3 * y3 + y2 * y2 - z3 * z3 + z2 * z2;
	
	// Left side of EQ3 is of the form a3x + b3y + c3z
	// where a3, b3, and c3 are the coefficients		
	a3 = 2 * (x2 - x3);
	b3 = 2 * (y2 - y3);
	c3 = 2 * (z2 - z3);
	
	// The two equations (EQ1, EQ3) are now linear equations in the three unknowns:
	// EQ1: a1x + b1y + c1z = k1
	// EQ3: a3x + b3y + c3z = k3	
		
		
/*	
	2. Use them to find two of the variables (x, y) as linear expressions in the
	third (z).  These two equations are those of a line in 3-space, which
	passes through the two points of intersection of the three spheres. 
*/

	// Find y as a linear expression of z.
	// y = ez + f
	
	if (a1 === 0) {
	
		// y = -(c1/b1)z + k1/b1
		e = -c1 / b1;
		f = k1 / b1;
		
	} else if (a3 === 0) {
	
		// y = -(c3/b3)z + k3/b3
		e = -c3 / b3;
		f = k3 / b3;		
		
	} else {

		// If a1 and a3 are non-zero:
		// Multiply EQ1 by a3 / a1, then subtract EQ3 from it.
		// This gives a new equation with coefficients 
	
		a31 = a3 / a1;
		
		// Subtract equations, x term cancels out. Left with:
		// (a31 * b1 - b3)y + (a31 * c1 - c3)z = a31 * k1 - k3
		
		e = - ((a31 * c1 - c3) / (a31 * b1 - b3));
		f = (a31 * k1 - k3) / (a31 * b1 - b3);
	
	}

	// Find x as a linear expression of z.
	// x = gz + h		
	
	if (b1 === 0) {
	
		g = -c1 / a1;
		h = k1 / a1;
		
	} else if (b3 === 0) {
	
		g = -c3 / a3;
		h = k3 / a3;
		
	} else {

		// If b1 and b3 are non-zero:
		// Multiply EQ1 by b3 / b1, then subtract EQ3 from it.
		// This gives a new equation with coefficients 
	
		b31 = b3 / b1;
		
		// Subtract equations, y term cancels out. Left with:
		// (b31 * a1 - a3)x + (b31 * c1 - c3)z = b31 * k1 - k3
		
		g = - ((b31 * c1 - c3) / (b31 * a1 - a3));
		h = (b31 * k1 - k3) / (b31 * a1 - a3);
	}
	
/*	
	3. Then substitute these into the equation of any of the original
	spheres (EQ1).  This will give you a quadratic equation in one variable,
	which you can solve to find the two roots.  
	EQ1: (x1 - x)^2 + (y1 - y)^2 + (z1 - z)^2 = r1^2
	EQ1: (x1 - gz - h)^2 + (y1 - ez - f)^2 + (z1 - z)^2 = r1^2
	
	x1^2 - x1gz - x1h - x1gz + g^2 * z^2 + ghz - x1h + ghz + h^2 +
	y1^2 - y1ez - y1f - y1ez + e^2 * z^2 + efz - y1f + efz + f^2 +
	z1^2 - 2z1z + z^2
	= r1^2
	Simplify and put in quadratic form of Az^2 + Bz + C = 0
	
	x1^2 + y1^2 + z1^2 - x1h - y1f - x1h - y1f + h^2 + f^2
	- x1gz - y1ez - 2z1z - x1gz - y1ez + ghz + efz + ghz + efz
	+ g^2 * z^2 + e^2 * z^2 + z^2
	= r1^2
	 
	x1^2 + y1^2 + z1^2 - x1h - y1f - x1h - y1f + h^2 + f^2 - r1^2
	+ (- x1g- y1e - 2z1 - x1g - y1e + gh + ef + gh + ef) * z
	+ (g^2 + e^2 + 1) * z^2
	= 0
*/	

	A = g * g + e * e + 1;
	B = -x1 * g - y1 * e - 2 * z1 - x1 * g - y1 * e + 2 * g * h + 2 * e * f;
	C = x1 * x1 + y1 * y1 + z1 * z1 - 2 * x1 * h - 2 * y1 * f + h * h + f * f - r1 * r1;
	
	// Quadratic formula: z = (-B +- sqrt(B^2 - 4AC)) / 2A
	// Use the quadratic formula to solve to find the two roots.
	
	rootD = Math.sqrt(B * B - 4 * A * C);
	
	z = (-B + rootD) / (2 * A);
	z_ = (-B - rootD) / (2 * A);

/*	
	4. These values will allow you to determine the corresponding values of
	the other two variables, giving you the coordinates of the two
	intersection points.	
*/
		
	x = g * z + h;
	x_ = g * z_ + h;
	
	y = e * z + f;
	y_ = e * z_ + f;
	
	return [x, y, z, x_, y_, z_];
}

class Vector3 { 
    x: number = 0; 
    y: number = 0; 
    z: number = 0; 

	constructor(x: number, y: number, z: number) { 
		this.x = x; 
		this.y = y; 
		this.z = z; 
	}
   
    getDistance(target: Vector3) : number { 
        let dx = this.x - target.x; 
        let dy = this.y - target.y; 
        let dz = this.z - target.z; 

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}
class Asteroid { 
    position: Vector3; 

    constructor() { 
        this.position = createRandomCoord() as Vector3; 
    }
}

class Probe { 
    position: Vector3; 
    distance: number; 

    constructor(position: Vector3, asteroid: Asteroid) { 
        this.position = position; 
		this.distance = this.position.getDistance(asteroid.position);
		this.distance = Number(this.distance.toFixed(3));
    }
}
