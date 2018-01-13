var datasetDayOfWeek, datasetDayOfMonth, datasetMonthOfYear;

//
// Loading the CSV files
//

d3.csv("data/DayOfWeek.csv", function(d) {
  return {
    label : d.DayOfWeek,
    value : d.PercentDelayed * 100
  };
}, function(data) {
  datasetDayOfWeek = data;
  colorizeDataset(datasetDayOfWeek);
  change(datasetDayOfWeek, DOWTitle, DOWSubtitle, DOWXAxis);
});

d3.csv("data/DayOfMonth.csv", function(d) {
  return {
    label : d.DayOfMonth,
    value : d.PercentDelayed * 100
  };
}, function(data) {
  datasetDayOfMonth = data;
  colorizeDataset(datasetDayOfMonth);
});

d3.csv("data/MonthOfYear.csv", function(d) {
  return {
    label : d.MonthOfYear,
    value : d.PercentDelayed * 100
  };
}, function(data) {
  datasetMonthOfYear = data;
  colorizeDataset(datasetMonthOfYear);
});


function colorizeDataset(dataset)
{
    //
    // Colors of bars
    //

    // Color of regular bar
    barColor = "#adadad";
    // Color of max bar
    barMaxColor = "#c94c4c";
    // Color of min bar
    barMinColor = "#86af49";

    maxVal = 0;
    minVal = Number.MAX_VALUE;
    for (i = 0; i < dataset.length; i++)
        {
            minVal = Math.min(minVal, dataset[i].value);
            maxVal = Math.max(maxVal, dataset[i].value);
        }

    for (i = 0; i < dataset.length; i++)
        {
            if (dataset[i].value == minVal)
            {
                dataset[i].color = barMinColor;
            }
            else if (dataset[i].value == maxVal)
            {
                dataset[i].color = barMaxColor;
            }
            else
            {
                dataset[i].color = barColor;
            }
        }
    return dataset;
}

//
// Chart titles
//

// Day of week
DOWTitle = "How the day of week affects chances of flight delays?"
DOWSubtitle = "Histogram of delayed flights per day of the week"
DOWXAxis = "Day"

// Day of month
DOMTitle = "How the day of month affects chances of flight delays?"
DOMSubtitle = "Histogram of delayed flights per day of the month"
DOMXAxis = "Day of Month"

// Month of year
MOYTitle = "How the month affects chances of flight delays?"
MOYSubtitle = "Histogram of delayed flights per month"
MOYXAxis = "Month"

d3.selectAll("input").on("change", selectDataset);

d3.select("input[value=\"dow\"]").property("checked", true);

function selectDataset()
{
    var value = this.value;
    if (value == "dow")
    {
        change(datasetDayOfWeek, DOWTitle, DOWSubtitle, DOWXAxis);
    }
    else if (value == "dom")
    {
        change(datasetDayOfMonth, DOMTitle, DOMSubtitle, DOMXAxis);
    }
    else if (value == "moy")
    {
        change(datasetMonthOfYear, MOYTitle, MOYSubtitle, MOYXAxis);
    }
}

var margin = {top: (parseInt(d3.select('body').style('height'), 10)/10), right: (parseInt(d3.select('body').style('width'), 10)/20), bottom: (parseInt(d3.select('body').style('height'), 10)/10), left: (parseInt(d3.select('body').style('width'), 10)/20)},
    width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
    height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

var div = d3.select("body").append("div").attr("class", "toolTip");

var formatPercent = d3.format("");

var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .2, 0.5);

var y = d3.scale.linear()
        .range([height, 0]);

var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "times-chart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function change(dataset, Title, Subtitle, XAxisLabel) {

    // Reset axes and bars
    svg.select(".y.axis").remove();
    svg.select(".x.axis").remove();
    svg.selectAll(".bar").remove();
    svg.select("#chartTitle").remove();
    svg.select("#chartSubTitle").remove();

    x.domain(dataset.map(function(d) { return d.label; }));
    y.domain([0, d3.max(dataset, function(d) { return d.value; })]);

    //
    // Add chart title
    //
    svg.append('text')
        .attr("id", "chartTitle")
        .attr("y", "-40")
        .attr("x", "50%")
        .attr("text-anchor", "middle")
        .attr('class', 'chart-title')
        .text(Title)
        .style("font-size", "20px")
        .style("font-weight", "bold")

    // Add subtitle
     svg.append('text')
        .attr("id", "chartSubTitle")
        .attr("y", "-15")
        .attr("x", "50%")
        .attr("text-anchor", "middle")
        .attr('class', 'chart-title')
        .text(Subtitle)
        .style("font-size", "14px")

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("text-anchor","middle")
        .attr("x", width/2)
        .attr("y", 40)
        .style("font-size", "12px")
        .text(XAxisLabel);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .text("Flights Delayed %");


    // set data
    var bar = svg.selectAll(".bar")
        .data(dataset, function(d) { return d.label; });

    
    bar.enter().append("rect")
        .attr("class", "bar")
        .attr("fill", function(d) { return d.color; })
        .attr("x", function(d) { return x(d.label); })
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); })
        .attr("width", x.rangeBand());

    bar
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.label)+"<br>"+(d.value)+"%");
        });
    bar
        .on("mouseout", function(d){
            div.style("display", "none");
        });
};

