let height = 400, //setting size constants
    width = 600,
    margin = ({ top: 25, right: 30, bottom: 35, left: 40 });
  
const svg = d3.select("#chart") // selecting the id of chart on html page and appending svg to it
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.csv('penguins.csv').then(data => { // calling the data source
  
  let x = d3.scaleLinear() // choosing data for x axis
    .domain(d3.extent(data, d => d.body_mass_g)).nice()
    .range([margin.left, width - margin.right]); // the space the x axis takes on the page

  let y = d3.scaleLinear() // setting the y scale
    .domain(d3.extent(data, d => d.flipper_length_mm)).nice() // d3.extent is like d3.min and d3.max
    .range([height - margin.bottom, margin.top]);

  svg.append("g") // creating the x axis
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .attr("class", "x-axis")
    .call(d3.axisBottom(x).tickFormat(d => (d/1000) + "kg").tickSize(-height + margin.top + margin.bottom)) // creates kilograms when data is in grams
            // creates the grid for the scatterplot
  svg.append("g") // creating the y axis
    .attr("transform", `translate(${margin.left},0)`)
    .attr("class", "y-axis")
    .call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right)) //creates the grid for the scatterplot.  Could do tick.Size(0) to get rid of ticks/lines

  svg.append("g")
    .attr("fill", "black")
    .selectAll("circle")
    .data(data)
    .join("circle") // joins data with circles
    .attr("cx", d => x(d.body_mass_g)) // assigns x data to cirles
    .attr("cy", d => y(d.flipper_length_mm)) // assigns y data to circles 
    .attr("r", 2)
    .attr("opacity", 0.75); // will show both cirles if there's overlap

  const tooltip = d3.select("body").append("div") // going into html and selecting body tag.  Append a new div.  Give that div a class svg.tool-tip and apply the 2 styles
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

  d3.selectAll("circle") // adding an event listener (.on).  
    .on("mouseover", function(event, d) { // when someone mouses over a dot
      d3.select(this).attr("fill", "red");
      tooltip
        .style("visibility", "visible")
        .html(`Species: ${d.species}<br />Island: ${d.island}<br />Weight: ${d.body_mass_g/1000}kg`); 
    }) // when mouse over a dot, the dot turns red and there is info under the chart
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY - 10) + "px") // - 10 to create padding away from the cirle
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() { // when mouse goes off of the circle
      d3.select(this).attr("fill", "black"); //turn the circle back to black
      tooltip.style("visibility", "hidden"); // hid the tool-tip that popped up
    })
    
});