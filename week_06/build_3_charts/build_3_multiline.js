//let height = 500,
    //width = 800,
   // margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
   let innerWidth = width - margin.left - margin.right;

const svg_1 = d3.select("#chart_multiline")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.csv("deaths_by_month_v2.csv").then(data => {
  let timeParse = d3.timeParse("%Y-%m");

  let states = new Set();

  for (let d of data) {
    d.Date = timeParse(d.Date);
    d.Deaths = +d.Deaths;
    states.add(d.State);
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.Date))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Deaths))
    .range([height - margin.bottom, margin.top]);

  svg_1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  svg_1.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d ));

  let line = d3.line()
    .x(d => x(d.Date))
    .y(d => y(d.Deaths));
 
  for (let state of states) {
    let stateData = data.filter(d => d.State === state);

    let g = svg_1.append("g")
      .attr("class", "State")
      .on('mouseover', function () {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (state === "California") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(stateData)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = stateData[stateData.length - 2]; //last piece of data to position text x and y

    g.append("text")
      .text(state)
      .attr("x", x(lastEntry.Date) + 10)
      .attr("y", y(lastEntry.Deaths))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999");
  }
  svg_1.append("text")
  .attr("class", "y-label")
  .attr("text-anchor", "end")
  .attr("x", -margin.top/2)
  .attr("dx", "-0.5em")
  .attr("y", 10)
  .attr("transform", "rotate(-90)")
  .text("Number of Deaths");
});