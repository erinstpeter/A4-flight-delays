# Flight day statistics page
## Create by Bobi Marciano Gilburd
## https://erinstpeter.github.io/A4-flight-delays/FlightDay/

#Data:
Raw flight-statistics tables were downloaded from https://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236 for the time period 11/2016 to 10/2017. The tables are in the repository and named 2016_11.csv to 2017_10.csv.
In order to create the histograms datasets for visualization I’ve developed and run the CreateFlightDelayTimeStats.py python. This script takes the raw DOT tables and creates 3 CSV histograms for day of the week (DayOfWeek.csv), day of the month (DayOfMonth.csv), and month of the year (MonthOfYear.csv). The script uses lookup tables to convert values of days and weeks to strings (lookup tables downloaded from DOT’s website: https://www.transtats.bts.gov/Download_Lookup.asp?Lookup=L_MONTHS, https://www.transtats.bts.gov/Download_Lookup.asp?Lookup=L_WEEKDAYS)




#Visualization
The visualization I’ve used is based on this example: http://bl.ocks.org/juan-cb/1afee8f2cae799e86707

Changes I've made to the visualization:
1.	In the original example the data was hardcoded inside the js. I've changed the code so that it loads the data from external CSV files.
2.	I’ve added support to set the color of the bar with the maximal value in red, and the bar with the minimal value in green (in the original example all of the bars were in the same color).
3.	I’ve added support to switch between datasets with different x axis categories (the original example only supported switching between datasets with the same x axis).
4.	I’ve added an “id” property to the chart’s svg so that the chart’s styles will not affect other elements in the page.
5.	I’ve also added an x axis label (there was no x axis label in the original example), and changed the y axis text.

