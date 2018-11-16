// from data.js
var tableData = data;
var tbody = d3.select("tbody");

function buildTbl(table) 
{
  table.forEach((sighting) => 
  {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => 
    {
      var cell = tbody.append("td");
      cell.text(value);
    });
  });
}

buildTbl(tableData);


function clickFilter() 
{
    d3.event.preventDefault();
    tbody.html("");
    var inputElement = d3.select("#datetime").property("value");
    var filteredData = tableData.filter(rw => rw.datetime === inputElement);

    buildTbl(filteredData);
};  

d3.select("#filter-btn").on('click', clickFilter);
 
