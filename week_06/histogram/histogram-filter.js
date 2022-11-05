// Histogram & Joins

const height = 400,
    width = 600,
    margin = ({ top: 25, right: 10, bottom: 50, left: 10 }),
    padding = 1;

const svg = d3.select("#chart")  // d3.create, but will not put/select it on the chart
    .append("svg")
    .attr("viewBox", [0, 0, width, height]);

d3.json('climate.json').then((data) => {      
    console.log(data)

    const x = d3.scaleLinear()
        .range([margin.left, width - margin.right])
        .domain([0,65]);
  
    const y = d3.scaleLinear()
        .range([height - margin.bottom, margin.top])
        .domain([0,10]);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom + 5})`)
        .call(d3.axisBottom(x));

    const binGroups = svg.append("g")
        .attr("class", "bin-group");

    function updateChart(m) { // passing the month of the data we want for the chart
        const bins = d3.bin()
            .thresholds(10)  
            .value(d => d.average)(data[m]); // average is the column name that we want from the data

        binGroups.selectAll("g")
            .data(bins, d => d.x0)
        .join(     // this is an expanded join when the data changes (someeone changed the drop down.  )
            enter => { // as soon as the viz joins with the data, we're opening
            let g = enter.append("g")

            g.append("rect")
                .attr("x", d => x(d.x0) + padding / 2)
                .attr("y", height - margin.bottom)
                .attr("width", d => x(d.x1) - x(d.x0) - padding)
                .attr("height", 0)
                .attr("fill", "steelblue")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            g.append("text")
                .text(d => d.length)
                .attr("x", d => x(d.x0) + (x(d.x1) - x(d.x0)) / 2)
                .attr("y", height - margin.bottom - 5)
                .attr("text-anchor", "middle")
                .attr("fill", "#333")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            update => { //transition to the new month that someone selected.  
            update.select("rect")
                .transition()
                .duration(750)
                .attr("y", d => y(d.length))
                .attr("height", d => height - margin.bottom - y(d.length));

            update.select("text")
                .text(d => d.length)
                .transition()
                .duration(750)
                .attr("y", d => y(d.length) - 5);
            },
            exit => { // this is for the thing (data and viz) that's going off of the page
            exit.select("rect")
                .transition()
                .duration(750)
                .attr("height", 0)
                .attr("y", height - margin.bottom);

            exit.select("text")
                .text("");

            exit.transition()
                .duration(750)
                .remove();
            }
        );

        svg.selectAll("foreignObject").remove(); // the average temperature text box display

        let temp = d3.mean(data[m], d => d.average).toFixed(1); //toFixed limits the average to 1 decimal point
        let str = `The average temperature in  
                    <b style="text-transform:capitalize;">${m} 2020</b> was 
                    <b>${temp}℉</b>.` // creates the html string in css.  temp was created on line 93.  She used css because capitalization is more complicated in html.  

        svg.append("foreignObject")
          .attr("x", 10)
          .attr("y", 100)
          .attr("width", 120)
          .attr("height", 100)
          .append('xhtml:div') // this is required for a Safari browser
          .append("p") // appends the paragraph before adding the string
          .html(str);
    }

    updateChart("january");

    d3.selectAll("select") // someone changes the drop down menu creates an event
        .on("change", function (event) {
            const m = event.target.value;
            updateChart(m); 
        });
});