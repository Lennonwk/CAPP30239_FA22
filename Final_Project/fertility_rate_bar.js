const height_2 = 500,
          width_2 = 800, 
          margin_2 = ({ top: 25, right: 30, bottom: 35, left: 30 });


d3.csv("Datasets/fertility_rate_v2.csv").then(data => { 

    for (let d of data) {
        d.y2020_rate = +d.y2020_rate; 
    };

    data.sort((a, b) => b.y2020_rate - a.y2020_rate);  

    let svg_2 = d3.select("#fertility_rate_bar")
        .append("svg")
        .attr("viewBox", [-100, 0, width_2 + 100, height_2 +10 ]); 

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y2020_rate)]).nice()
        .domain([0, 2.5])
        .range([margin_2.left, width_2 - margin_2.right]);
    
    let y = d3.scaleBand()
        .domain(data.map(d => d.country))
        .range([margin_2.top, height_2 - margin_2.bottom])
        .padding(0.2);

    svg_2.append("g")
        .attr("transform", `translate(0,${height_2 - margin_2.bottom + 5})`) 
        .call(d3.axisBottom(x));
    
    svg_2.append("g")
        .attr("transform", `translate(${margin_2.left - 5},0)`)
        .call(d3.axisLeft(y));

    let bar = svg_2.selectAll(".bar") 
        .append("g")
        .data(data)
        .join("g")
        .attr("class", "bar");

    bar.append("rect") 
        .attr("fill", "#3182bd")
        .attr("x", margin_2.left)
        .attr("width", d => x(d.y2020_rate)) 
        .attr("y", d => y(d.country))
        .attr("height", y.bandwidth());

    svg_2.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width_2- margin_2.right)
        .attr("y", height_2 +10)
        .attr("dx", "0.5em")
        .attr("dy", "-0.5em")
        .text("Fertility Rate")
        .attr("font-size", "12px");
    

});