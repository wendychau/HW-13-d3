// @TODO: YOUR CODE HERE!

// SVG
var margin = {
    top: 40,
    bottom: 70,
    left: 50,
    right: 50
};

var svgHeight = window.innerHeight * 0.75;
var svgWidth = window.innerWidth * 0.75;

var height = svgHeight - margin.top - margin.bottom;
var width = svgWidth - margin.left - margin.right;

var svg = d3.select("#scatter")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// group
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(healthData) {
    //if (error) return console.warn(error);
    //console.log(healthData);

    healthData.forEach(function(data) {
        data.smokes = +data.smokes;
        data.income = +data.income;
    });

    // scales
    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.income)-1500, d3.max(healthData, d => d.income)+2000])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.smokes)-1, d3.max(healthData, d => d.smokes)+2])
        .range([height, 0]);

    // axes
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // append axes
    chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.income))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "12")
        .attr("fill", "blue")
        .attr("stroke-width", "1")
        .attr("stroke", "black")
        .attr("opacity", "0.75");

    chartGroup.append("g").selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.income))
        .attr("y", d => yLinearScale(d.smokes))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("font-family", "sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "white")

    // axis titles
    chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 5})`)
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .text("Annual Income ($)");
        
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("text-anchor", "middle")
        .attr("font-size", "20px")
        .text("Smokers (%)");

});