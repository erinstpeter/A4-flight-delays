 [Airports—Erin St. Peter]
 https://erinstpeter.github.io/A4-flight-delays/Airports/
 
Process for Gathering & Editing Data:
I used the DOT annual passengers dataset (Excel file for years 2005-2016 found here https://www.rita.dot.gov/bts/press_releases/bts013_17) to serve as the traffic data per airport in this analysis. This dataset only included the thirty US airports with the highest traffic. The full file can be found in my repository, titled Large_Hubs.csv
-	In order to create the relative sizes of the circles in my d3 visualization I had to divide the traffic numbers in this spreadsheet such that they fit into the parameters of the d3. The d3 circle sizes were based on absolute numbers and not relative percentages, and thus I converted the traffic by dividing each value by. Thus, Atlanta’s traffic value was converted from 50,476,272 to 50.476272.
-	I also changed IATA cells of the four largest airport codes to also include the name of the city that the airport was located in, since I knew that these circles in the visualizations would have room for longer titles.
Then, in order to explore % on-time departures against airport traffic size, I added annual on-time departure data for each airport in the above list for 2016. I used BLS data (https://www.bts.dot.gov/content/ranking-major-airport-time-arrival-performance-year-date-through-december-2016) to add a column for 2016 on-time arrival percentages to my dataset in Excel. I then used on-time arrival percentages from this data source combined with airport traffic from the DOT dataset to create the scatterplot in Excel. In excel, I also calculated the correlation coefficients to describe the relationship between on-time departure %s and airport size, with and without Atlanta included in the sample.

Process for altering Visualization:
For this project, I modified Chris Tufts’ original d3 source code (https://bl.ocks.org/ctufts/f38ef0187f98c537d791d24fda4a6ef9). The modifications that I made are as follows:

-	Inserted a title, subtitle, and legend within the js file
-	Used the div function to insert the visualization in the middle of the page, rather than just appending it at the end
-	Added a third “group” into the Large_Hubs_chart1.csv (transformed on-time delay values into three category values in Excel). The original chart only included two different color-separated clusters. I created a third group to separate the data into three on-time departure categories.
-	Added a third color and changed each color of the bubble categories in order represent the three different delay categories.
-	Increased the height of the chart so that the bubbles were not getting cut off
-	Altered slightly the gravity value for the chart such that the bubbles moved slightly differently in regards to one another
-	Changed the cluster padding (separation between different-color nodes)
-	Increased the maximum radius of the nodes

