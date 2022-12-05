const tooltip = d3.select("body").append("div")
  .attr("class", "svg-tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden");

const height_2 = 610,
  width_2 = 975;

const svg_2 = d3.select("#fert_rate_change")
  .append("svg")
  .attr("viewBox", [0, 0, width_2, height_2]);

Promise.all([
  d3.csv("Datasets/fertility_rate_cleaned_final.csv"),
  d3.json("libraries/countries-110m.json")
]).then(([data, world]) => {
  const dataById = {};

  for (let d of data) {
    d.rate_change = +d.rate_change;
    dataById[d.id] = d;
  }

  const countries = topojson.feature(world, world.objects.countries);
  const projection = d3.geoMercator()
  //const projection = d3.geoAlbers().translate([width / 2, height / 2])
  //.fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  const color = d3.scaleQuantize()
    .domain([-5, 1]).nice()
    .range(["#99000d", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#636363"]);
    //["",,,,,,,]

  //const path = d3.geoPath();

  d3.select("#legend")
    .node()
    .appendChild(
      Legend(
        d3.scaleOrdinal(
          ["-5", "-4", "-3", "-2", "-1", "0", "Unreported"],
          (["#99000d", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1",  "#636363"])
        ),
        { title: "Fertility Rate Change from 1970 to 2020" }
      ));

  svg_2.append("g")
    .selectAll("path")
    .data(countries.features)
    .join("path")
    .attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate_change) : '#ccc')
    .attr("d", path)
    .on("mousemove", function (event, d) {
      let info = dataById[d.id];
      tooltip
        .style("visibility", "visible")
        .html(`${info.country}<br>${info.rate_change}`)
        .style("top", (event.pageY - 10) + "px")
        .style("left", (event.pageX + 10) + "px");
      d3.select(this).attr("fill", "white");
    })
    .on("mouseout", function () {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", d => (d.id in dataById) ? color(dataById[d.id].rate_change) : '#ccc');
    });
});