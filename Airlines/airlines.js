var margin = {top: 100, right: 180, bottom: 150, left: 180},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("delays_1.tsv", function(error, data){

    // filter year
    var data = data.filter(function(d){return d.Year == '2017';});
    // Get every column value
    var elements = Object.keys(data[0])
        .filter(function(d){
            return ((d != "Year") & (d != "State"));
        });
    var selection = elements[0];

    var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d){
                return +d[selection];
            })])
            .range([height, 0]);

    var x = d3.scale.ordinal()
            .domain(data.map(function(d){ return d.State;}))
            .rangeRoundBands([0, width], 0.1);


    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)" );

    svg.append('text')
    	.attr("transform", "translate(" + -100 +"," + 40 + ")")
    	.attr('class', 'axis-label')
    	.text('Minutes');

    svg.append('text')
        .attr("transform", "translate(" + 200 +"," + -40 + ")")
        .attr('class', 'chart-title')
        .text('Delays by Airline')
        .style("font-size", "20px")
        .style("text-decoration", "underline");

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.selectAll("rectangle")
        .data(data)
        .enter()
        .append("rect")
        .attr("class","rectangle")
        .attr("width", x.rangeBand())
        .attr("height", function(d){
            return height - y(+d[selection]);
        })
        .attr("x", function(d, i){
            return x(d.State) ;   
        })
        .attr("y", function(d){
            return y(+d[selection]);
        })
        .append("title")
        .text(function(d){
            return d.State + " : " + d[selection];
        });

    var selector = d3.select("#drop")
        .append("select")
        .attr("id","dropdown")
        .on("change", function(d){
            selection = document.getElementById("dropdown");

            y.domain([0, d3.max(data, function(d){
                return +d[selection.value];})]);

            yAxis.scale(y);

            d3.selectAll(".rectangle")
                .transition()
                .attr("height", function(d){
                    return height - y(+d[selection.value]);
                })
                .attr("x", function(d, i){
                    return x(d.State) ;
                })
                .attr("y", function(d){
                    return y(+d[selection.value]);
                })
                .ease("linear")
                .select("title")
                .text(function(d){
                    return d.State + " : " + d[selection.value] + " mins";
                });
      
            d3.selectAll("g.y.axis")
                .transition()
                .call(yAxis);

         });

    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })

});