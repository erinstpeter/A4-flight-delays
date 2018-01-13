# Plane Type statistics page

Created by **Chris Hilger** (Uploaded by Bobi since Chris had spotty internet access)

https://erinstpeter.github.io/A4-flight-delays/PlaneType/

Data was gathered from the Department of Transportation’s web site On-Time Performances table. This dataset contained roughly 7MM rows of all filed flights that took place in 2017 in the US. From this, I filtered out the airports, leaving only the 50 busiest US airports in 2017 by passenger traffic.  I also filtered out any plane that wasn’t one of the top 7 most popular types of planes. I also removed any rows that contained missing delay data. I spent roughly 15 hours of data manipulation and exploratory data analysis.

I created two charts. 

The first was made using Plotly.js for R. This shows the percent frequency of delay, with delays bucketed into 5 distinct groups. (Early, < 15 min delayed, < 60 min delayed, <180 min delayed, and “Very Late” which means more than 180 min late).  Additionally, this data just shows flights departing from Boston. This plot allows the user to view all the types of delays or filter them out so see only “early” arrivals for example. To create this dataset, I had to add a column to categorize the amount of delay, and group by plane type to determine the percent frequency of delay. 

The base chart for this was here https://plot.ly/r/horizontal-bar-charts/. Note, I had to spend roughly 10 hours to create this plot, since it is highly customized and I had to learn how to use Plotly. 

The second chart shows the percent on-time arrival, which is defined by the FAA as no later than 15 minutes later than scheduled arrival. To create this, I used the base D3 example here https://bl.ocks.org/mbostock/3885304. This chart includes data from the top 50 airports, not just Boston. The resulting [tsv](https://github.com/erinstpeter/A4-flight-delays/blob/master/PlaneType/data.tsv) is very small, as it is just the final percentage values for each plane type. This makes for a very quick load in the browser. I customized this chart by altering the Y axis so it does not start at zero. This was done to make the difference between percentage of on-time arrival more apparent. Also, I added a title and axis label.  Additionally, I changed the Y axis to be reported in percentage rather than just a number.

My final data for the Plotly.js chart is here: https://plot.ly/~chilger/5/. I didn't upload it to github becuase it is too big of a file for github to allow
