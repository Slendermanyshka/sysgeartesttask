export {};
const form = document.getElementById("form");
const resultarea = document.getElementById("resultarea");

form!.addEventListener('submit', handleSubmit);


function handleSubmit(event:SubmitEvent){
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const parsedData = parseInput(data.get("datain") as string);
    const parsedCond = parseInput(data.get("condin") as string);
    
}

function sortFunc(data:object, cond:object){
    
    
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