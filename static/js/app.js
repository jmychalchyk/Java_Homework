// from data.js
var tableData = data;
var tbody = d3.select("tbody");
var dhead = d3.select("#drophead");
var dhead2 = d3.select("#drophead2");
var dc = d3.select("#dropcriteria");
var vdt = Object.keys(getWordCnt(tableData.map(event => event.datetime)));
var vcity = Object.keys(getWordCnt(tableData.map(event => event.city)));
var vstate = Object.keys(getWordCnt(tableData.map(event => event.state)));
var vcountry = Object.keys(getWordCnt(tableData.map(event => event.country)));
var vshape = Object.keys(getWordCnt(tableData.map(event => event.shape)));
var gvselected
var inputElement

function getWordCnt(arr){
  return arr.reduce(function(prev,next){
      prev[next] = (prev[next] + 1) || 1;
      return prev;
  },{});
}

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
    var filteredData = tableData.filter(rw => rw[gvselected.toLowerCase()] === inputElement);
    tbody.html(""); 
    buildTbl(filteredData);
};  

function filterWhat() 
{
  d3.event.preventDefault();
  dc.html("");
  var vselected = this.text
 
  dhead.text(vselected);
  dhead2.text(`Select ${vselected.toLowerCase()} critera below`)
  switch(vselected) {
    case "Date/Time":
        vdt.forEach((item)=>{dc.append('a').attr("class","dropdown-item").html(item)}); 
        gvselected = 'datetime';         
        break;
    case "City":
        vcity.forEach((item)=>{dc.append('a').attr("class","dropdown-item").html(item)});   
        gvselected=vselected; 
        break;
    case "State":
        vstate.forEach((item)=>{dc.append('a').attr("class","dropdown-item").html(item)});
        gvselected=vselected;     
        break;
    case "Country":
        vcountry.forEach((item)=>{dc.append('a').attr("class","dropdown-item").html(item)});
        gvselected=vselected;     
        break;
    case "Shape":
        vshape.forEach((item)=>{dc.append('a').attr("class","dropdown-item").html(item)});
        gvselected=vselected;     
        break;
  }   

  $('.dropdown-menu .dropdown-item').on('click', function(){
    console.log($(this).html());
    inputElement = $(this).html();
  })
}; 

function clickRefresh() {
  location.reload();
}

d3.select("#datetime").on('click', filterWhat); 
d3.select("#city").on('click', filterWhat);
d3.select("#state").on('click', filterWhat);
d3.select("#country").on('click', filterWhat);
d3.select("#shape").on('click', filterWhat);

d3.select("#dropcriteria").on('click', clickFilter);
d3.select("#reset").on('click', clickRefresh);



