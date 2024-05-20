var debug = true;

function getNote(note) {
    myPrint(note)
    if (note === "R") {
        return '<a href="#" data-tooltip="One of each workout">Recovery</a>'
    } else if (note === "B") {
        return '<a href="#" data-tooltip="30 mins">Brick</a>'
    }

    return "";

}

function createRow(wkoutDate, run, bike, swim, note) {
    let row = document.createElement("tr");
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");
    let c4 = document.createElement("td");
    let c5 = document.createElement("td");

    c1.innerHTML = wkoutDate;
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

fetch('tridata.csv')
.then(response => response.text())
.then(data => {
    var lines = data.split("\n");
    myPrint(lines[0])
    var inner = "";
    var table = document.getElementById("wkoutTable");
    lines.forEach((line, idx) => {
        var p = parseWkoutString(lines[idx])
        var row = createRow(p.wkoutDate, p.run, p.bike, p.swim, p.note);
        myPrint(row)
        table.appendChild(row);
    });
})