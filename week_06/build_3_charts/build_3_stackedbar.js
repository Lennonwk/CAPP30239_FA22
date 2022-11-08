const width = 800,
height = 500,
margin = {top: 40, right: 20, bottom: 40, left: 50};

const svg = d3.select("#chart_stackedbar")
.append("svg")
.attr("viewBox", [0, 0, width, height]);

d3.csv("death_age_gender.csv").then( data => {

let x = d3.scaleBand(data.map(d => (d.group)),[margin.left, width -  margin.right]) 
.padding([0.2]); 

let y = d3.scaleLinear([0,450],[height - margin.bottom, margin.top]);

svg.append("g")
.attr("transform", `translate(0,${height - margin.bottom})`)
.call(d3.axisBottom(x))

svg.append("g")
.attr("transform", `translate(${margin.left},0)`)
.call(d3.axisLeft(y).tickSize(-width + margin.left + margin.right))

//protein,carbs,fiber
const subgroups = data.columns.slice(1); 

const color = d3.scaleOrdinal(subgroups,['#e41a1c','#377eb8']);

const stackedData = d3.stack()
.keys(subgroups)(data);

console.log(stackedData)
svg.append("g")
.selectAll("g")
.data(stackedData)
.join("g")
.attr("fill", d => color(d.key))
.selectAll("rect")
.data(d => d)
.join("rect")
.attr("x", d => x(d.data.group))
.attr("y", d => y(d[1]))
.attr("height", d => y(d[0]) - y(d[1]))
.attr("width",x.bandwidth());

let legendGroup = svg 
.selectAll(".legend-group")
.data(subgroups)
.join("g")
.attr("class", "legend-group");

legendGroup
.append("circle")
.attr("cx", (d, i) => (10 + (i * 150)))
.attr("cy",10)
.attr("r", 3)
.attr("fill", (d, i) => color(i));

legendGroup
.append("text")
.attr("x", (d, i) => (20 + (i * 150)))
.attr("y",15)
.text((d, i) => subgroups[i]);

svg.append("text")
.attr("class", "x-label")
.attr("text-anchor", "end")
.attr("x", width - margin.right)
.attr("y", height)
.attr("dx", "0.5em")
.attr("dy", "-0.5em") 
.text("Age of Deceased");

svg.append("text")
.attr("class", "y-label")
.attr("text-anchor", "end")
.attr("x", -margin.top/2)
.attr("dx", "-0.5em")
.attr("y", 10)
.attr("transform", "rotate(-90)")
.text("Number of Deaths");
});