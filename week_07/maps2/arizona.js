const height = 600,
  width = 975;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

d3.json("libs/counties-albers-10m.json").then(us => {  
  us.objects.states.geometries = us.objects.states.geometries.filter(d => d.properties.name === "Arizona"); // can change different states to show
  
  const az = topojson.feature(us, us.objects.states); // Map simple geometries, used to create canvas
  const mesh = topojson.mesh(us, us.objects.states); // Shape of object, used to center and resize (projection).  Allows us to center, zoom in, change the angle
  const projection = d3.geoIdentity() // this takes Arizona, makes it bigger and put it in the center of the screen
    .angle(10) // rotates the Arizona 
    .fitSize([width, height], mesh);
  const path = d3.geoPath().projection(projection);

  svg.append("g")
    .selectAll("path")
    // .data(counties.features)
    // .data(states.features)
    .data(az.features)
    .join("path")
    .attr("stroke","#999")
    .attr("fill","#eee")
    .attr("d", path);
    
});