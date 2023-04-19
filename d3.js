function vis(){


function ScatterPlot() {var data = d3.range(100).map(function() {
         return [Math.random() * 100, Math.random() * 100];
       });

       var svg = d3.select("#scatterplot svg"),
          margin=120;
           width = svg.attr("width") - margin,
           height = svg.attr("height") - margin,
           g = svg.append("g").attr("transform", "translate(" + 100 + "," + 100 + ")");

        var xScale = d3.scaleLinear().domain([0, 100]).range([0, width]),
            yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);
     
         // Title
        svg.append('text')
        .attr('x', width/2 + 100)
        .attr('y', 70)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Raleway')
        .style('font-size', 18)
        .text('Scatter Plot');

         g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale));
        
        g.append("g")
         .call(d3.axisLeft(yScale));

         g.selectAll("circle")
          .data(data)
          .enter().append("circle")
          .attr("cx", function(d) { return xScale(d[0]); })
          .attr("cy", function(d) { return yScale(d[1]); })
          .attr("r", 4)
          .style("fill", "#E75480"); 
       }

  ScatterPlot();

function PieChart() {
  var svg = d3.select("#piechart svg"),
  width = svg.attr("width");
  height = svg.attr("height");
  radius = Math.min(width, height) / 2.5;

  var g = svg.append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal(['#88B04B', '#39a0ca', '#ffde22', '#ff3a22', '#585e61']);

  var ageRanges = ['0-17', '18-30', '31-45', '46-60', '61+'];

  var pie = d3.pie()
               .value(d => d.total)
               .sort(null);

  var path = d3.arc()
                .outerRadius(radius - 5)
                .innerRadius(0);

  var label = d3.arc()
                 .outerRadius(radius)
                 .innerRadius(radius - 80);

  d3.csv("titanic.csv").then(data => {
  var groupData = d3.group(data, d => {
    if (+d.Age <= 17) {
      return '0-17';
    } else if (+d.Age <= 30) {
      return '18-30';
    } else if (+d.Age <= 45) {
      return '31-45';
    } else if (+d.Age <= 60) {
      return '46-60';
    } else {
      return '61+';
    }
  });

    var entries = Array.from(groupData, ([key, value]) => ({ key, value: value.length }));
    var formatted = ageRanges.map(ageRange => {
      var match = entries.find(d => d.key === ageRange);
      return { ageRange, total: match ? match.value : 0 };
    });

    var arc = g.selectAll(".arc")
                 .data(pie(formatted))
                 .enter().append("g")
                 .attr("class", "arc");

    arc.append("path")
       .attr("d", path)
       .attr("fill", d => color(d.data.ageRange));

    arc.append("text")
       .attr("transform", d => `translate(${label.centroid(d)})`)
       .text(d => d.data.ageRange);

    svg.append("text")
       .attr("x", width /2)
       .attr("y", 40)
       .attr("text-anchor", "middle")
       .text("Age Distribution of Titanic Passengers")
       .style('font-family', 'Raleway')
       .style('font-size', 18)
       .attr("class", "title");
  });
    }

  PieChart();
}