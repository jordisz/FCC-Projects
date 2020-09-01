const canvas = d3.select(".canvas");
const svg = canvas.append("svg")
                    .attr("height", 600)
                    .attr("width", 950);

//margins and dimensions
const margin = {top: 20, right: 20, bottom: 100, left: 100};
const graphWidth = 950 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

//graph "container"
const graph = svg.append("g")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//title
svg.append("text")
    .attr("id", "title")
    .attr("x", 20)
    .attr("y", 20)
    .text("United States GDP, 1947-2015")


d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(data =>{

  //get quarter/year data for every element
    var year = data.data.map((el) => {
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
  const GDP = data.data.map(el => el[1])
  
  const GDPMax = d3.max(GDP)
  
  //set scale Y
  const scaleY = d3.scaleLinear()
    .domain([0, GDPMax])
    .range([graphHeight, 0]) 
  
  //apply scaleY to GDP values
  const scaledGDP = GDP.map(el => scaleY(el))
  
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
    .attr("y", (d, i) =>  d)
    .attr("width", graphWidth/275)
    .attr("height", (d, i) => graphHeight - d)
    .style("fill", "black")
});