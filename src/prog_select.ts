export {};
const form = document.getElementById("form");
const resultarea = document.getElementById("resultarea");
form!.addEventListener('submit', handleSubmit);



function handleSubmit(event:SubmitEvent){
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const formData = parseInput(data.get("datain") as string);
    const parsedData = formData.data as object[];
    const parsedCond = formData.condition  as object;


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

    for(const [key, value] of Object.entries(parsedCond)) {  
        modifiedData = switcher(modifiedData, key, value);
    }
    printOutput(modifiedData,resultarea as HTMLElement);
}

function include(data: any[], conditions: any[]): any[] { 
    conditions.forEach(conditionObject => {
        for(const [condition, conditionValue] of Object.entries(conditionObject)) {
            data = data.filter(x => x[condition] == conditionValue);   
        }
    });

    return data; 
}

function exclude(data: any[], conditions: any[]): any[] { 
    conditions.forEach(conditionObject => {
        for(const [condition, conditionValue] of Object.entries(conditionObject)) {
            data = data.filter(x => x[condition] != conditionValue);   
        }
    });

    return data; 
}

function sort(data: any[], conditions: any[]): any[] {
    let res = data;

    conditions.forEach(key => {
        res.sort((a, b) => {
            return a[key] - b[key];
        });
    });
    res.sort(); 
    
    return res;
}

function switcher(data: any[], condition: string, conditions: any[]): any[] {
    let res = data;
    switch(condition){
        case("include"):{            
            res = include(res, conditions);
            break; 
        }

        case("exclude"):{
            res = exclude(res, conditions);
            break;
        }
        case("sortBy"):{
            res = sort(res, conditions);
            break;
        }
        default:{
            console.log("We do nothing");
            break;
        }
    } 
        
    return res;
}

function parseInput(stringData: string){
    if(stringData != ""){
        const jsonObj = JSON.parse(stringData);
        return jsonObj;
    }
}
function printOutput(object:object, resultarea: HTMLElement){
    let readyJson = JSON.stringify(object);
    resultarea!.innerText = readyJson;
    return console.log(readyJson);
}