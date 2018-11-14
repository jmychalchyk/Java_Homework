// from data.js
var tableData = data;
var tbody = d3.select("tbody");

function buildTbl(table) {tableData.forEach((siting) => {
    // tbody.html("");
    // d3.select("span").html("");
    var row = tbody.append("tr");
  Object.entries(siting).forEach(([key, value]) => {
    var cell = tbody.append("td");
    cell.text(value);
  });
});
}

buildTbl(tableData);

var btnFilter = d3.select("#filter-btn");

btnFilter.on("click", function() {
    d3.event.preventDefault();
    var inputElement = d3.select("#datetime").property("value");
    console.log(inputElement)
    var filteredData = tableData.filter(rw => rw.datetime === inputElement);
    console.log(filteredData)
    tbody.html("");
    d3.select("span").html("");
    buildTbl(filteredData);
    });  