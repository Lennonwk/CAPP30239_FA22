var svg_2 = d3.select("#fertility_rate"),
    margin_2 = {top: 20, right: 30, bottom: 30, left: 150},
    width_2 = +svg.attr("width") - margin_2.left - margin_2.right,
    height_2 = +svg.attr("height") - margin_2.top - margin_2.bottom;

// add scales
var x = d3.scaleLinear().rangeRound([10, width_2 - 10]),
    y = d3.scalePoint().rangeRound([height_2, 10]).padding(0.4);

var chart = svg_2.append("g")
    .attr("transform", "translate(" + margin_2.left + "," + margin_2.top + ")");

// import data from csv
d3.csv("fertility_rate_v2.csv", function(d) {
  d.y1990_rate = +d.y1990_rate; // coerce to number
  return d;
}, function(error, data) {

  if (error) throw error;

  // sort vehicles from highest to lowest inventory
  data.sort(function(a, b) {
    // range is flipped, so it ascends from bottom of chart
    return d3.ascending(+a.y1990_rate, +b.y1990_rate);
  });

  x.domain([0, d3.max(data, function(d) { return d.y1990_rate; })]);
  y.domain(data.map(function(d) { return d.country; }));

  // x-axis
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height_2 + ")")
      .call(d3.axisBottom(x))
    .append("text")
      .attr("text-anchor", "end")
      .text("Birth Rate");

  // y-axis
  chart.append("g")
      .attr("class", "y axis")
      .call(d3.axisLeft(y));

  var dumbbellGroup = chart.append("g")
      .attr("id", "dumbbellGroup");

  var dumbbell = dumbbellGroup.selectAll(".dumbbell")
      .data(data)
    .enter().append("g")
      .attr("class", "dumbbell")
      .attr("transform", function(d) { return "translate(0," + y(d.country) + ")"; });

  // lines: between dots
  dumbbell.append("line")
      .attr("class", "line between")
      .attr("x1", function(d) { return x(d.y2020_rate); })
      .attr("x2", function(d) { return x(d.y1990_rate); })
      .attr("y1", 0)
      .attr("y2", 0);

  // lines: before dots
  dumbbell.append("line")
      .attr("class", "line before")
      .attr("x1", 0)
      .attr("x2", function(d) { return x(d.y2020_rate); })
      .attr("y1", 0)
      .attr("y2", 0);

  // dots: current inventory
  dumbbell.append("circle")
      .attr("class", "circle past_rate")
      .attr("cx", function(d) { return x(d.y1990_rate); })
      .attr("cy", 0)
      .attr("r", 6);

  // data labels: past_rate
  dumbbell.append("text")
      .attr("class", "text past_rate")
      .attr("x", function(d) { return x(d.y1990_rate); })
      .attr("y", 0)
      .attr("dy", ".35em")
      .attr("dx", 10)
      .text(function(d) { return d.y1990_rate; });

  // data labels: future
  dumbbell.append("text")
      .attr("class", "text current_rate")
      .attr("x", function(d) { return x(d.y2020_rate); })
      .attr("y", 0)
      .attr("dy", ".35em")
      .attr("dx", -10)
      .attr("text-anchor", "end")
      .text(function(d) { return d.y2020_rate; });

  d3.select(".dumbbell:last-child")
    .append("text")
      .attr("class", "label past_rate")
      .attr("x", function(d) { return x(d.y1990_rate); })
      .attr("y", 0)
      .attr("dy", -20)
      .attr("text-anchor", "middle")
      .text("1990");
  d3.select(".dumbbell:last-child")
    .append("text")
      .attr("class", "label current_rate")
      .attr("x", function(d) { return x(d.y2020_rate); })
      .attr("y", 0)
      .attr("dy", -20)
      .attr("text-anchor", "middle")
      .text(function(d) { return "2020"; });

  // dots: future inventory
  dumbbell.append("circle")
      .attr("class", "circle current_rate")
      .attr("cx", function(d) { return x(d.y2020_rate); })
      .attr("cy", 0)
      .attr("r", 6);

});