const height_1 = 500,
    width_1 = 800,
    margin_1 = ({ top: 25, right: 30, bottom: 35, left: 30 })


let svg_1 = d3.select("#worker_retiree_ratio")
  .append("svg")
  .attr("viewBox", [-50, -25, width + 100, height +100]);

d3.csv("Datasets/worker_ratio_cleaned_final.csv").then(data => {

  let subgroups = data.columns.slice(1)
  console.log(subgroups)

  let countries = data.map(d => d.country).keys()
  console.log(countries)

let x = d3.scaleBand(data.map(d => (d.country)),[0, width_1]) 
    .padding([0.2])
svg_1.append("g")
    .attr("transform", `translate(0,${height_1})`)
    .call(d3.axisBottom(x).tickSize(0))
    .selectAll("text")
      .attr("transform", "translate(0,0)rotate(-45)")
      .style("text-anchor", "end");

  let y = d3.scaleLinear([0,12],[height_1, margin_1.top]);
    
  svg_1.append("g")
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

  let xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  let color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(["#6baed6","#3182bd","#08519c"])

  svg_1.append("g")
    .selectAll("g")
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
      
svg_1.append("circle")
    .attr("cx",600)
    .attr("cy",50)
    .attr("r", 5)
    .style("fill", "#6baed6")
svg_1.append("circle")
    .attr("cx",600)
    .attr("cy",102)
    .attr("r", 5)
    .style("fill", "#3182bd")
svg_1.append("circle")
    .attr("cx",600)
    .attr("cy",152)
    .attr("r", 5)
    .style("fill", "#08519c")
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
    .text("2050 Projections")
    .style("font-size", "12px")
    .attr("alignment-baseline","middle")

})