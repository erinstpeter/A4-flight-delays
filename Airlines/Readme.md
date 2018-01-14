# Airlines statistics page

Created by **Zain Ul Abideen Shahid**

https://erinstpeter.github.io/A4-flight-delays/Airlines/

Data and analysis:

The Data used for the visualization was gathered from the Department of Transportations On-Time Performance statistics website.From this, I ran an R script (https://github.com/erinstpeter/A4-flight-delays/tree/master/PlaneType/Flight Data Visualization.Rmd) to clean the table(this is the same R script that Chris ran to prepare his data). The R Script gave me the file that I used python to create a table of average flight delays over 2017. I only kept routes from Boston to New York, Houston, San Francisco, Washington D.C. and Chicago.

The output from the python script (https://github.com/erinstpeter/A4-flight-delays/Airlines/creating_delays.ipnyb) was a csv that I manually reshaped to fit the format required by the visualization.

Visualization:

I decided a simple bar graph to visualize average flight delays by airlines as this information can give the user a sense of which airlines have historically had high delays. The user can then choose the appropriate flight for their route.

The visualization that I used can be found here: http://bl.ocks.org/jonahwilliams/2f16643b999ada7b1909

I made the following changes to the visualization:

- Created y-axis label
- Changed the borders and increased the size of the visualization.
- Created a chart title.
- Changed the color of the bars from steel blue to dodger blue.

