const tooltip = d3.select("body")
  .append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height = 610,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

Promise.all([
  d3.csv("data/unemployment2020.csv"),  // Need to load 2 files (Data and mesh).  Data: ids are mapping to topo JSON
  d3.json("libs/counties-albers-10m.json") // Mesh: This file contains the shape of all counties in the US.  
]).then(([data, us]) => { // first value is the data and the second comes from counties-albers (the mesh)
  const dataById = {};

  for (let d of data) {
    d.rate = +d.rate;
    //making a lookup table from the array (unemployment data)
    dataById[d.id] = d; 
  }

  console.log(dataById)

  const counties = topojson.feature(us, us.objects.counties);  //uses the feature method from the topoJSON library.  us is the mesh

  // Quantize evenly breakups domain into range buckets
  const color = d3.scaleQuantize()  //breaks up the domain amongst multiple colors.  This is the color scale.  
    .domain([0, 10]).nice() //from 0 to 10 percent unemployment
    .range(d3.schemeBlues[9]);

  const path = d3.geoPath();  // craetes a path ( d = ... in the browser).  Tells D3 that we're about to build a map

  d3.select("#legend")
    .node() 
    .appendChild( // the child that we're appending is the legend.  
      Legend( // this is a function named legend.  This legend function lives in libs/d3-color-legend.js
        d3.scaleOrdinal( // don't need to give it a scale.  Could just use "color"
          ["1", "2", "3", "4", "5", "6", "7", "8", "9+"], // this array is what range is listed for the legend buckets.  I can change this to anything. "Hello"
          d3.schemeBlues[9]
        ),
        { title: "Unemployment rate (%)" }
      ));

  svg.append("g")
    .selectAll("path")
    .data(counties.features)
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc') // determines the fill (color) of the path.  If there is data, use the rate to determine the color.  If there is not data, fill the county with gray.  
    .attr("d", path) // this creates the path
    .on("mousemove", function (event, d) { // This is an event. We could use click or 
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info.county}<br>${info.rate}%`)
        .style("top", (event.pageY - 10) + "px") // 
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "goldenrod");  // this color pops up when mousing over a county.  
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate) : '#ccc');
    });
});