d3.json('budget-2022.json').then((data) => {
  const height = 400,
    width = 600,
    innerRadius = 125,
    outerRadius = 175,
    labelRadius = 200;

  const arcs = d3.pie().value(d => d.amount)(data); // d3.pie buckets the data for a pie chart
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius); // making inner radius 0 will create a pie chart
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
    .attr("stroke", "white") // makes white separators
    .attr("stroke-width", 2)  // makes white separators
    .attr("stroke-linejoin", "round")  // makes white separators
    .selectAll("path") 
    .data(arcs) // starts  the datajoin
    .join("path")
    .attr("fill", (d, i) => d3.schemeCategory10[i]) // d is the data, i is the index.  If it excedes 10 colors, it will loop it again.
    .attr("d", arc);

  svg.append("g")
    .attr("font-size", 10)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    .attr("transform", d => `translate(${arcLabel.centroid(d)})`) // tells you the center point of an arc.  Use this to place the label
    .selectAll("tspan")
    .data(d => {
      return [d.data.category, d.data.amount];
    })
    .join("tspan")
    .attr("x", 0)
    .attr("y", (d, i) => `${i * 1.1}em`)
    .attr("font-weight", (d, i) => i ? null : "bold")
    .text(d => d);

  svg.append("text")
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("2022")
    .style("font-size", 20);
});