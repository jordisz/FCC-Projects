const canvas = d3.select(".container");
const svg = canvas.append("svg")
                    .attr("height", 600)
                    .attr("width", 950);

//margins and dimensions
const margin = {top: 40, right: 20, bottom: 70, left: 100};
const graphWidth = 950 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;
const barWidth = graphWidth/275;

//tooltip
const tooltip = canvas.append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

//graph "container"
const graph = svg.append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//title
svg.append("text")
    .attr("id", "title")
    .attr("x", 400)
    .attr("y", 70)
    .text("United States GDP, 1947-2015")

d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(data =>{

  //get quarter/year data for every element
    var year = data.data.map(function(el){
        var quarter;
        var q = el[0].substring(5, 7);
    
        switch(q){
        case "01":
            quarter = "Q1";
            break;
        case "04":
            quarter = "Q2";
            break;
        case "07":
            quarter = "Q3";
            break;
        case "10":
            quarter = "Q4";
            break;
        }
        return el[0].substring(0, 4) + ' ' + quarter;
  });
  
  //convert first val in every data.data array to date in order to set x (scaleTime)
  const dates = data.data.map(el => new Date(el[0]));
  
  const first = d3.min(dates);
  const last = d3.max(dates);
  
  //set scale X
  const scaleX = d3.scaleTime()
    .domain([first, last])
    .range([0, graphWidth])
  
  //get array of GDP values (second val in every data.data array)
  const GDP = data.data.map(function(el){
    return el[1]
  });
  
  const GDPMax = d3.max(GDP)

  //apply scale to GDP values
  const GDPscale = d3.scaleLinear()
  .domain([0, GDPMax])
  .range([0, graphHeight]);

  const scaledGDP = GDP.map(el => GDPscale(el))
  
  //set scale Y
  const scaleY = d3.scaleLinear()
    .domain([0, GDPMax])
    .range([graphHeight, 0]) 

  //axes and axes groups
  const xAxis = d3.axisBottom(scaleX);
  const yAxis = d3.axisLeft(scaleY)
    .ticks();
  
  const xAxisGroup = graph.append("g")
    .attr("id", "x-axis")
    .attr("transform", `translate(0, ${graphHeight})`)
    .call(xAxis);
  const yAxisGroup = graph.append("g")
    .attr("id", "y-axis")
    .call(yAxis);
  
  //draw bars and set attrs
  const bars = graph.selectAll("rect")
    .data(scaledGDP)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d, i) => data.data[i][0])
    .attr("data-gdp", (d, i) => data.data[i][1])
    .attr("x", (d, i) => scaleX(dates[i]))
    .attr("y", (d, i) => graphHeight - d)
    .attr("width", barWidth)
    .attr("height", (d, i) =>  d)
    .style("fill", "black")

    bars.on("mouseover", function(d, i, n) {		
      tooltip.transition()		
          .duration(200)		
          .style("opacity", .9);
          console.log(this)
      tooltip.html(year[i] + '<br>' + '$' + GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') + ' Billion' )
      .style("left", (i * 1.7)  + "px")
      .style("top", graphHeight -100 + "px")
      .style("transform", "translate(450px, 100px)");		

      
      })					
  .on("mouseout", function(d) {		
      tooltip.transition()		
          .duration(300)		
          .style("opacity", 0);
    })
});