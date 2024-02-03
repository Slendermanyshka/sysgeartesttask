"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById("form");
const resultarea = document.getElementById("resultarea");
const units = {
    km: 100000,
    m: 100,
    cm: 1,
    mm: 0.1,
    mi: 160934,
    yd: 91.44,
    ft: 30.48,
    in: 2.54
};
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const parsedData = parseInput(data.get("jsonin"));
    let result = convertFunc(parsedData);
    if (result != null) {
        printOutput(result, resultarea);
    }
}
function parseInput(stringData) {
    if (stringData != "") {
        const jsonObj = JSON.parse(stringData);
        return jsonObj;
    }
}
function convertFunc(data) {
    let result;
    if (units.hasOwnProperty(data.distance.unit)) {
        const distName = data.distance.unit;
        const convName = data.convertTo;
        result = data.distance.value * units[distName];
        console.log("in Cm " + result);
        if (units.hasOwnProperty(data.convertTo)) {
            result = result / units[convName];
            result = +((result).toFixed(2));
            // result = Math.round((result*100)/100);
            // console.log(result.toFixed(2));
            return result = {
                unit: data.convertTo,
                value: result
            };
        }
        else {
            console.log("Not found the name of the unit to convert to");
            return null;
        }
    }
    else {
        console.log("Not found the name of the unit to convert from");
        return null;
    }
    console.log(result);
}
function printOutput(object, resultarea) {
    let readyJson = JSON.stringify(object);
    resultarea.innerText = readyJson;
    return console.log(readyJson);
}
