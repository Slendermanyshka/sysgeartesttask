"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById("form");
const resultarea = document.getElementById("resultarea");
form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = parseInput(data.get("datain"));
    const parsedData = formData.data;
    const parsedCond = formData.condition;
    /*
        {"data": [
            {"user": "mike@mail.com", "rating": 20, "disabled": false},
            {"user": "greg@mail.com", "rating": 14, "disabled": false},
            {"user": "john@mail.com", "rating": 25, "disabled": true}],
    
         "condition": {"include": [{"disabled": true}],
                       "sortBy": ["rating"]}
        }
    */
    let modifiedData = parsedData;
    for (const [key, value] of Object.entries(parsedCond)) {
        modifiedData = switcher(modifiedData, key, value);
    }
    printOutput(modifiedData, resultarea);
}
function include(data, conditions) {
    conditions.forEach(conditionObject => {
        for (const [condition, conditionValue] of Object.entries(conditionObject)) {
            data = data.filter(x => x[condition] == conditionValue);
        }
    });
    return data;
}
function exclude(data, conditions) {
    conditions.forEach(conditionObject => {
        for (const [condition, conditionValue] of Object.entries(conditionObject)) {
            data = data.filter(x => x[condition] != conditionValue);
        }
    });
    return data;
}
function sort(data, conditions) {
    let res = data;
    conditions.forEach(key => {
        res.sort((a, b) => {
            return a[key] - b[key];
        });
    });
    res.sort();
    return res;
}
function switcher(data, condition, conditions) {
    let res = data;
    switch (condition) {
        case ("include"): {
            res = include(res, conditions);
            break;
        }
        case ("exclude"): {
            res = exclude(res, conditions);
            break;
        }
        case ("sortBy"): {
            res = sort(res, conditions);
            break;
        }
        default: {
            console.log("We do nothing");
            break;
        }
    }
    return res;
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
