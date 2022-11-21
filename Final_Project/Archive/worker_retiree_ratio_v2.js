const width = 860,
height = 100,
margin = { top: 10, right: 30, bottom: 20, left: 0 };

const svg = d3.select("#worker_retiree_ratio")
.append("svg")
.attr("viewBox", [0, 0, width, height]);

d3.csv("Datasets/worker_ratio_cleaned_final.csv").then(data => {

let x = d3.scaleLinear([0, 100], [margin.left, width - margin.right]);

let y = d3.scaleBand(data.map(d => (d.country)), [margin.top, height - margin.bottom])
  .padding([0.1]);

const subgroups = data.columns.slice(1);
console.log(subgroups)

const color = d3.scaleOrdinal(subgroups, ["#fee0d2","#fc9272","#de2d26"]);
const stackedData = d3.stack()
  .keys(subgroups)(data)

svg.append("g")
  .selectAll("g")
  .data(stackedData)
  .join("g")
  .attr("fill", d => color(d.key))
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .selectAll("rect")
  .data(d => d)
  .join("rect")
  .attr("x", d => x(d[0]))
  .attr("y", d => y(d.data.country))
  .attr("width", d => x(d[1]) - x(d[0]))
  .attr("height", y.bandwidth());

subgroups.append('text')
  .text(d => d.num)
  .attr('x', d => x(d.branch) + (x.bandwidth()/2))
  .attr('y', d => y(d.num) + 15)
  .attr('text-anchor', 'middle')
  .style('fill', 'white');

  
})