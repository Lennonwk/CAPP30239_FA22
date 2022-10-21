/* Line Chart for the Canadian monthly long-term interest rate in 2020. */

const height = 500,  //Above data call because it doesn't need data (performance boost)
    width = 800,
    margin = ({ top: 15, right: 30, bottom: 35, left: 40 });

const svg = d3.select("#chart")  //Above data call because it doesn't need data (performance boost)
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);


d3.csv('long-term-interest-canada.csv').then(data => { // This file is accessed for chart data

    let timeParse = d3.timeParse("%Y-%m"); // Time series attribute of the data "Month" is formatted as YYYY-mm

    for (let d of data) { // for loop that creates a array(?) from each value in the "Month" atribute
        d.Num = +d.Num;
        d.Month = timeParse(d.Month); // timeParese function is used to determined how the month/year is formatted in the .csv
    }
    let x = d3.scaleTime() // Function used to create and return a new time scale which have the particular domain and range
        .domain(d3.extent(data, d => d.Month)) // Array of integers that defines the extent of domain values.
        .range([margin.left, width - margin.right]); //Array of integers or string

    let y = d3.scaleLinear() // Used to create the vertical axis using data from the "Num" attribute of the csv
        .domain([0,d3.max(data, d => d.Num)])
        .range([height - margin.bottom, margin.top])

    svg.append("g") // Creates an 'scalable vector graphics' element.
        .attr("transform", `translate(0,${height - margin.bottom})`) // Places x-axis at the bottom of the chart
        .call(d3.axisBottom(x).tickSizeOuter(0)); // removes the tick at the end of the x axis

        svg.append("g")
        .attr("transform", `translate(${margin.left},0)`) // Places y-axis on left side of the chart
        .call(d3.axisLeft(y).tickSizeOuter(0).tickFormat(d => d + "%").tickSize(-width));
            //.tickFormat: makes the y-axis ticks percentages
            //.tickSize(-width): makes the ticks into lines that go completely across the graph
  
      svg.append("text")
        .attr("class", "x-label")
        .attr("text-anchor", "end")
        .attr("x", width - margin.right)
        .attr("y", height)
        .attr("dx", "0.5em")
        .attr("dy", "-0.5em") 
        .text("Month of 2020"); // Labels the x axis
      
      svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "end")
        .attr("x", -margin.top/2)
        .attr("dx", "-0.5em")
        .attr("y", 10)
        .attr("transform", "rotate(-90)")
        .text("Interest rate");
  
      let line = d3.line() // creates the line object
          .x(d => x(d.Month)) // x coordinate data points
          .y(d => y(d.Num)) // y coordinate data points
          .curve(d3.curveNatural); // Smooths the line between data points
      
      svg.append("path")  // Places the line object on the chart
          .datum(data)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", "red"); // makes the line red

});