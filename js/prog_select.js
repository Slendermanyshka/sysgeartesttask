"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById("form");
const resultarea = document.getElementById("resultarea");
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const parsedData = parseInput(data.get("datain"));
    const parsedCond = parseInput(data.get("condin"));
    console.log(data);
    console.log(parsedData);
    console.log(parsedCond);
}
function parseInput(stringData) {
    if (stringData != "") {
        const jsonObj = JSON.parse(stringData);
        return jsonObj;
    }
}
function printOutput(object, resultarea) {
    let readyJson = JSON.stringify(object);
    resultarea.innerText = readyJson;
    return console.log(readyJson);
}
