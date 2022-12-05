const height = 500,
    width = 800,
    margin = ({ top: 25, right: 30, bottom: 35, left: 30 })
    innerWidth = width - margin.left - margin.right;

const svg = d3.select("#pension_spending")
  .append("svg")
  .attr("viewBox", [-50, 0, width + 100, height]);

d3.csv("Datasets/pension_cost_cleaned_final_v2.csv").then(data => {
  let timeParse = d3.timeParse("%Y");

  let countries = new Set();

  for (let d of data) {
    d.year = timeParse(d.year);
    d.percent_of_gdp = +d.percent_of_gdp;
    countries.add(d.country);
  }

  let x = d3.scaleTime()
    .domain(d3.extent(data, d => d.year))
    .range([margin.left, width - margin.right]);

  let y = d3.scaleLinear()
    .domain(d3.extent(data, d => d.percent_of_gdp))
    .range([height - margin.bottom, margin.top]);

  svg.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

    svg.append("text")
    .attr("class", "y-label")
    .attr("text-anchor", "end")
    .attr("x", -margin_1.top/2)
    .attr("dx", "-0.5em")
    .attr("y", -5)
    .attr("transform", "rotate(-90)")
    .text("Pension Expenditure as a Percentage of National GDP")
    .style("font-size", "12px");

  svg.append("g")
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickSize(-innerWidth).tickFormat(d => d + "%"));

  let line = d3.line()
    .x(d => x(d.year))
    .y(d => y(d.percent_of_gdp));
 
  for (let country of countries) {
    let countryData = data.filter(d => d.country === country); 

    let g = svg.append("g")
      .attr("class", "country")
      .on('mouseover', function () {
        d3.selectAll(".highlight").classed("highlight", false);
        d3.select(this).classed("highlight", true);
      });

    if (country === "USA") {
      g.classed("highlight", true);
    }

    g.append("path")
      .datum(countryData)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("d", line)

    let lastEntry = countryData[countryData.length - 1]; 

    g.append("text")
      .text(country)
      .attr("x", x(lastEntry.year) +3)
      .attr("y", y(lastEntry.percent_of_gdp))
      .attr("dominant-baseline", "middle")
      .attr("fill", "#999")
      .style("font-size", "10px");

  }
  
});