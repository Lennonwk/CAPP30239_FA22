
// set the dimensions and margins of the graph
var margin = ({top: 20, right: 30, bottom: 40, left: 90}),
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3.select("#worker_retiree_ratio")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
// d3.csv("Datasets/worker_ratio_cleaned_final.csv", function(data) {
   d3.csv("Datasets/worker_ratio_cleaned_final.csv").then(data => {
  // Add X axis
  let x = d3.scaleLinear()
    .domain([0, 10])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      //.attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    // .domain(data.map(function(d) { return d.country; }))
    .domain(data.map(d => d.country)) 
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y))

  //Bars
  let bar = svg.selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0) )
    // .attr("y", function(d) { return y(d.country); })
    .attr("y", d => y(d.id))
    //.attr("width", function(d) { return x(d.ratio); })
    .attr("width", d => x(d.ratio))
    .attr("height", y.bandwidth() )
    .attr("fill", "#69b3a2")

    bar.append('text')
        .text(d => d.country)
        .attr('y', d => y(d.ratio) + (y.bandwidth()/2))
        .attr('x', d => x(d.country) + 15)
        .attr('text-anchor', 'middle')
        .style('fill', 'white')


    // .attr("x", function(d) { return x(d.Country); })
    // .attr("y", function(d) { return y(d.Value); })
    // .attr("width", x.bandwidth())
    // .attr("height", function(d) { return height - y(d.Value); })
    // .attr("fill", "#69b3a2")

})
