# Flight day statistics page

Created by **Bobi Marciano Gilburd**

https://erinstpeter.github.io/A4-flight-delays/FlightDay/

## Data
Raw flight arrival statistics were downloaded from https://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236. The period downloaded was 11/2016 to 10/2017 (data for Novermber 2017 is not available yet). The downloaed files can be found [here](https://github.com/erinstpeter/A4-flight-delays/tree/master/FlightDay/data) and are named 2016_11.csv to 2017_10.csv.

For creating histograms from the raw data I have develeoped [CreateFlightDelayTimeStats.py](https://github.com/erinstpeter/A4-flight-delays/blob/master/FlightDay/data/CreateFlightDelayTimeStats.py). This Python script takes raw DOT tables as input and creates 3 CSV histograms: for day of the week ([DayOfWeek.csv](https://github.com/erinstpeter/A4-flight-delays/blob/master/FlightDay/data/DayOfWeek.csv)), day of the month ([DayOfMonth.csv](https://github.com/erinstpeter/A4-flight-delays/blob/master/FlightDay/data/DayOfMonth.csv)), and month of the year ([MonthOfYear.csv](https://github.com/erinstpeter/A4-flight-delays/blob/master/FlightDay/data/MonthOfYear.csv)). The script uses lookup tables to convert values of days and weeks to strings (lookup tables were downloaded from DOT’s website: [L_WEEKDAYS.csv](https://www.transtats.bts.gov/Download_Lookup.asp?Lookup=L_WEEKDAYS), [L_MONTHS.csv](https://www.transtats.bts.gov/Download_Lookup.asp?Lookup=L_MONTHS))


## Visualization
The visualization I use was based on this example: http://bl.ocks.org/juan-cb/1afee8f2cae799e86707

I have made the following changes to the original example:
1. In the original example the data was hardcoded inside the js. I changed the code so that it loads the data from external CSV files.
1. Added support to set the colors of the maximal and minimal bars in different colors (in the original example all bars had the same color).
1. Added chart title, subtitle, and x-axis label, and changed the y-axis label.
1. Added support to switch between datasets with different x-axis categories (the original example supported only datasets with the same x-axis).
1. Added “id” property to the chart’s svg so that the chart’s styles will not affect other elements of the page, and changed the chart's css accordingly.


