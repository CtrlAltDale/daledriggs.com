var debug = false;
var runIncrementInput = parseInt(document.getElementById("runIncrementInput").value);
var runLimitInput = parseInt(document.getElementById("runLimitInput").value);
var bikeIncrementInput = parseInt(document.getElementById("bikeIncrementInput").value);
var bikeLimitInput = parseInt(document.getElementById("bikeLimitInput").value);
var swimIncrementInput = parseInt(document.getElementById("swimIncrementInput").value);
var swimLimitInput = parseInt(document.getElementById("swimLimitInput").value);
var loadWeek = -1;


function getNote(note) {
    myPrint(note)
    if (note === "R") {
        return '<a href="#" data-tooltip="One of each workout">Recovery</a>'
    } else if (note === "B") {
        return '<a href="#" data-tooltip="30 mins">Brick</a>'
    }

    return "";
}

var startSet = {
    wkoutDate: new Date(2024,5,24),
    run: 5,
    bike: 18,
    swim: 800,
    note: ""
}

function getInputData() {
    runIncrementInput = parseInt(document.getElementById("runIncrementInput").value);
    runLimitInput = parseInt(document.getElementById("runLimitInput").value);
    bikeIncrementInput = parseInt(document.getElementById("bikeIncrementInput").value);
    bikeLimitInput = parseInt(document.getElementById("bikeLimitInput").value);
    swimIncrementInput = parseInt(document.getElementById("swimIncrementInput").value);
    swimLimitInput = parseInt(document.getElementById("swimLimitInput").value);
}

function userInputChanged() {
    getInputData();
    var table = document.getElementById("wkoutTable");
    while (table.rows.length > 13) {
        table.deleteRow(-1);
    }
    calculateTableData()
}

function createRow(wkoutDate, run, bike, swim, note) {
    let row = document.createElement("tr");
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");
    let c4 = document.createElement("td");
    let c5 = document.createElement("td");

    c1.innerHTML = wkoutDate.toLocaleDateString();
    c2.innerHTML = run;
    c3.innerHTML = bike;
    c4.innerHTML = swim;
    c5.innerHTML = getNote(note.trim());

    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);

    return row;
}

function myPrint(thing) {
    if (debug) {
        console.log(thing);
    }
}

function parseWkoutString(wkoutString) {
    var strings = wkoutString.split(",");
    myPrint(strings)
    return {
        wkoutDate: strings[0] ? strings[0] : "",
        run: strings[1] ? strings[1] : "",
        bike: strings[2] ? strings[2] : "",
        swim: strings[3] ? strings[3] : "",
        note: strings[4] ? strings[4] : ""
    }
}

function userLimitsReached(row) {
    return row.bike >= bikeLimitInput && row.run >= runLimitInput && row.swim >= swimLimitInput;
}

function updateNoteLetter() {
    loadWeek++;
    if (loadWeek > 7){
        loadWeek = 0;
    }
    if(loadWeek < 3){
        return ""
    } else if (loadWeek === 3 || loadWeek === 7){
        return "R"
    } else {
        return "B"
    }

}

function printAllData(row) {
    myPrint("runIncrementInput:" + runIncrementInput);
    myPrint("runLimitInput:" + runLimitInput);
    myPrint("bikeIncrementInput:" + bikeIncrementInput);
    myPrint("bikeLimitInput:" + bikeLimitInput);
    myPrint("swimIncrementInput:" + swimIncrementInput);
    myPrint("swimLimitInput:" + swimLimitInput);
    myPrint("wkoutDate:" + row.wkoutDate);
    myPrint("run:" + row.run);
    myPrint("bike:" + row.bike);
    myPrint("swim:" + row.swim);
    myPrint("note:" + row.note);
}

function incrementRowData(row) {
    row.wkoutDate.setDate(row.wkoutDate.getDate() + 7);
    if(row.run < runLimitInput) {
        row.run += runIncrementInput;
    }
    if (row.bike < bikeLimitInput) {
        row.bike += bikeIncrementInput;
    }
    if (row.swim < swimLimitInput) {
        row.swim += swimIncrementInput;
    }
    row.note = updateNoteLetter()
    return row;
}

function calculateTableData() {
    var table = document.getElementById("wkoutTable");
    var rowData = structuredClone(startSet)
    var iter = 0;
    while (!userLimitsReached(rowData) && iter < 1000) {
        rowData = incrementRowData(rowData);
        var row = createRow(rowData.wkoutDate, rowData.run, rowData.bike, rowData.swim, rowData.note);
        table.appendChild(row);
        myPrint(iter)
        iter++;
    }
    myPrint("iter:" + iter)
    myPrint("row:" + rowData)
    myPrint("userLimitsReached:" + userLimitsReached(rowData))

}

calculateTableData()


