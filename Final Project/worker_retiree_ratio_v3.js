const margin_1 = {top: 10, right: 30, bottom: 70, left: 50},
    width_1 = 800 - margin_1.left - margin_1.right,
    height_1 = 400 - margin_1.top - margin_1.bottom;

// append the svg object to the body of the page
let svg_1 = d3.select("#worker_retiree_ratio")
  .append("svg")
    .attr("width", width_1 + margin_1.left + margin_1.right)
    .attr("height", height_1 + margin_1.top + margin_1.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin_1.left + "," + margin_1.top + ")");

// Parse the Data
d3.csv("Datasets/worker_ratio_cleaned_final.csv").then(data => {

  // List of subgroups = header of the csv files = soil condition here
  let subgroups = data.columns.slice(1)
  console.log(subgroups)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  let countries = data.map(d => d.country).keys()
  console.log(countries)

  // Add X axis
//   let x = d3.scaleBand()
//       .domain(data.map(d => d.country))
//       .range([0, width])
let x = d3.scaleBand(data.map(d => (d.country)),[0, width_1]) 
    .padding([0.2])
svg_1.append("g")
    // .attr("transform", "translate(0," + height + ")")
    // .call(d3.axisBottom(x).tickSize(0))
    .attr("transform", `translate(0,${height_1})`)
    .call(d3.axisBottom(x).tickSize(0))
    .selectAll("text")
      .attr("transform", "translate(0,0)rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  let y = d3.scaleLinear([0,12],[height_1, margin_1.top]);
//   let y = d3.scaleLinear()
//     .domain([0, 12])
//     .range([ height, 0 ]);
    
  svg_1.append("g")
    //.call(d3.axisLeft(y));
    .attr("transform", `translate(0,0)`)
    .call(d3.axisLeft(y).tickSize(-width_1))

  svg_1.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin_1.top/2)
    .attr("dx", "-0.5em")
    .attr("y", -25)
    .attr("transform", "rotate(-90)")
    .text("Number of Workers Per Retiree")
    .style("font-size", "12px");

  // Another scale for subgroup position?
  let xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  let color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#fee0d2","#fc9272","#de2d26"])

  // Show the bars
  svg_1.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.country) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height_1 - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });
      
    //   let legendGroup = svg 
    //   .selectAll(".legend-group")
    //   .data(subgroups)
    //   .join("g")
    //   .attr("class", "legend-group");
      
    //   legendGroup
    //   .append("rect")
    //   .attr("x", (d, i) => (7 + (i * 60)))
    //   .attr("y",4)
    //   .attr("width", 12)
    //   .attr("height",12)
    //   .attr("fill", (d, i) => color(i));
      
    //   legendGroup
    //   .append("text")
    //   .text((d, i) => subgroups[i])
    //   .attr("x", (d, i) => (20 + (i * 60)))
    //   .attr("y",15)
      
svg_1.append("circle")
    .attr("cx",600)
    .attr("cy",50)
    .attr("r", 5)
    .style("fill", "#fee0d2")
svg_1.append("circle")
    .attr("cx",600)
    .attr("cy",102)
    .attr("r", 5)
    .style("fill", "#fc9272")
svg_1.append("circle")
    .attr("cx",600)
    .attr("cy",152)
    .attr("r", 5)
    .style("fill", "#de2d26")
svg_1.append("text")
    .attr("x", 608)
    .attr("y", 50)
    .text("1990")
    .style("font-size", "12px")
    .attr("alignment-baseline","middle")
svg_1.append("text")
    .attr("x", 608) 
    .attr("y", 103)
    .text("2020")
    .style("font-size", "12px")
    .attr("alignment-baseline","middle")
svg_1.append("text")
    .attr("x", 608)
    .attr("y", 153)
    .text("2050")
    .style("font-size", "12px")
    .attr("alignment-baseline","middle")

})