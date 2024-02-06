"use strict";
const outputarea = document.getElementById("resultarea");
const refreshBtn = document.getElementById("refresh");
refreshBtn === null || refreshBtn === void 0 ? void 0 : refreshBtn.addEventListener("click", e => {
    location.reload();
});
window.addEventListener("load", (event) => {
    let asteroid = new Asteroid();
    let probe1 = new Probe(new Vector3(0, 0, 0), asteroid);
    let probe2 = new Probe(new Vector3(100, 0, 0), asteroid);
    let probe3 = new Probe(new Vector3(100, 100, 0), asteroid);
    const result = {
        result: {
            location: intersect3spheres(probe1, probe2, probe3),
            probes: {
                count: 3,
                coordinates: [
                    probe1.position,
                    probe2.position,
                    probe3.position
                ]
            }
        }
    };
    console.log(intersect3spheres(probe1, probe2, probe3));
    printOutput(result, outputarea);
});
function createRandomCoord() {
    return new Vector3(getRandomNumber(0, 100), getRandomNumber(0, 100), getRandomNumber(0, 100));
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function intersect3spheres(probe1, probe2, probe3) {
    const x1 = probe1.position.x;
    const y1 = probe1.position.y;
    const z1 = probe1.position.z;
    const r1 = probe1.distance;
    const x2 = probe2.position.x;
    const y2 = probe2.position.y;
    const z2 = probe2.position.z;
    const r2 = probe2.distance;
    const x3 = probe3.position.x;
    const y3 = probe3.position.y;
    const z3 = probe3.position.z;
    const r3 = probe3.distance;
    var a1, b1, c1, k1, a3, b3, c3, k3, a31, b31, e, f, g, h, A, B, C, x, y, z, rootD;
    k1 = r1 * r1 - r2 * r2 - x1 * x1 + x2 * x2 - y1 * y1 + y2 * y2 - z1 * z1 + z2 * z2;
    a1 = 2 * (x2 - x1);
    b1 = 2 * (y2 - y1);
    c1 = 2 * (z2 - z1);
    k3 = r3 * r3 - r2 * r2 - x3 * x3 + x2 * x2 - y3 * y3 + y2 * y2 - z3 * z3 + z2 * z2;
    a3 = 2 * (x2 - x3);
    b3 = 2 * (y2 - y3);
    c3 = 2 * (z2 - z3);
    if (a1 === 0) {
        e = -c1 / b1;
        f = k1 / b1;
    }
    else if (a3 === 0) {
        e = -c3 / b3;
        f = k3 / b3;
    }
    else {
        a31 = a3 / a1;
        e = -((a31 * c1 - c3) / (a31 * b1 - b3));
        f = (a31 * k1 - k3) / (a31 * b1 - b3);
    }
    if (b1 === 0) {
        g = -c1 / a1;
        h = k1 / a1;
    }
    else if (b3 === 0) {
        g = -c3 / a3;
        h = k3 / a3;
    }
    else {
        b31 = b3 / b1;
        g = -((b31 * c1 - c3) / (b31 * a1 - a3));
        h = (b31 * k1 - k3) / (b31 * a1 - a3);
    }
    A = g * g + e * e + 1;
    B = -x1 * g - y1 * e - 2 * z1 - x1 * g - y1 * e + 2 * g * h + 2 * e * f;
    C = x1 * x1 + y1 * y1 + z1 * z1 - 2 * x1 * h - 2 * y1 * f + h * h + f * f - r1 * r1;
    rootD = Math.sqrt(B * B - 4 * A * C);
    z = (-B + rootD) / (2 * A);
    x = g * z + h;
    y = e * z + f;
    x = Number(x.toFixed(0));
    y = Number(y.toFixed(0));
    z = Number(z.toFixed(0));
    return { x, y, z };
}
function printOutput(object, resultarea) {
    let readyJson = JSON.stringify(object);
    resultarea.innerText = readyJson;
    return console.log(readyJson);
}
class Vector3 {
    constructor(x, y, z) {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getDistance(target) {
        let dx = this.x - target.x;
        let dy = this.y - target.y;
        let dz = this.z - target.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}
class Asteroid {
    constructor() {
        this.position = createRandomCoord();
    }
}
class Probe {
    constructor(position, asteroid) {
        this.position = position;
        this.distance = this.position.getDistance(asteroid.position);
        this.distance = Number(this.distance.toFixed(3));
    }
}
