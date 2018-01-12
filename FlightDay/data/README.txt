Dataset

DOT's www.transtats.bts.gov website
Table: On-Time Performances
Time period: 11/2016-10/2017 (including)
Delay is considered above 15 minutes

Source tables were downloaded (manually for every month) from here:
https://www.transtats.bts.gov/DL_SelectFields.asp?Table_ID=236

Lookup tables (for days of week and months of year) downloaded from here:

L_MONTHS.csv_:
https://www.transtats.bts.gov/Download_Lookup.asp?Lookup=L_MONTHS

L_WEEKDAYS.csv_:
https://www.transtats.bts.gov/Download_Lookup.asp?Lookup=L_WEEKDAYS

=====================================================

Visualization

http://bl.ocks.org/juan-cb/1afee8f2cae799e86707

Changes I've made to the visualization:
1. Added support to switch between datasets with different x axis categories
2. In the example the data was hardcoded. I've changed the code to load external CSV files.
3. Added id property so that can change style only to chart.
4. [TODO] Color the best and worst to emphasize 