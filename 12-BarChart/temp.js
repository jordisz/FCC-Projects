fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json")
    .then(response => response.json())
    .then(data => {
        const w = 900;
        const h = 500;
        const dataset = data["data"]
        const padding = 50

        // Sets max point, scale, and axis for horizontal elements
        const xMin = d3.min(dataset, (d) => new Date(d[0]))
        const xMax = d3.max(dataset, (d) => new Date(d[0]))
        const xScale = d3.scaleTime()
                         .domain([xMin, xMax])
                         .range([padding, w - padding])
        const xAxis = d3.axisBottom(xScale)

        // Sets max point, scale, and axis for vertical elements
        const yMax = d3.max(dataset, (d) => d[1])
        const yScale = d3.scaleLinear()
                         .domain([0, yMax])
                         .range([h - padding, padding])
        const yAxis = d3.axisLeft(yScale)

        const tooltip = d3.select(".container")
                          .append("div")
                          .attr("id", "tooltip")
                          .style("width", "100px")
                          .style("position", "absolute")
                          .style("visibility", "hidden")
                          .style("background", "#EFEFEF")

        const svg = d3.select(".container")
                      .append("svg")
                      .attr("width", w)
                      .attr("height", h)


        svg.selectAll("rect")
           .data(dataset)
           .enter()
           .append("rect")
           .attr("x", (d, i) => xScale(new Date(d[0])))
           .attr("y", (d) => yScale(d[1]))
           .attr("width", (w/dataset.length) - .5)
           .attr("height", (d) => (h - padding) -  yScale(d[1]))
           .attr("class", "bar")
           .attr("data-date", (d) => d[0])
           .attr("data-gdp", (d) => d[1])
           .style("fill", "green")
           .on("mouseover", function (d, i) {
                d3.select(this)
                    .style("fill", "black")
                tooltip.style("visibility", "visible")
                       .attr("data-date", (x) => {
                           return d[0]
                       })
                       .text(`On ${d[0]}, the US GDP was ${d[1] < 1000 ? d[1] + " billion USD" : d[1] / 1000 + " trillion USD"}`)
                       .style("top", (event.pageY - padding) + "px")
                       .style("left", (event.pageX + padding) + "px")
                       
           })
           .on("mouseout", function (d, i) {
               d3.select(this)
                 .style("fill", "green")
                tooltip.style("visibility", "hidden")
           })

        // Appends x-Axis label
        svg.append("g")
           .attr("transform", `translate(0, ${h - padding})`)
           .attr("id", "x-axis")
           .call(xAxis)

        // Appends y-Axis label
        svg.append("g")
           .attr("transform", `translate(${padding}, 0)`)
           .attr("id", "y-axis")
           .call(yAxis)
    });
