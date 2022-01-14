# R10 - Data Visualization (COVID Tracker) (reflection)
For this project, I created a visualization from the number of COVID-19 cases and deaths. To do this, I called up the JSON from the [Covid Tracking API](https://covidtracking.com/data/api). Unfortunately, this project has been terminated since March 7th, 2021, so the data provided (A. cannot change, and B. contains information only from January 2020-March 7th, 2021.) During this project, I learned about the JSON format and making a visualization from the data provided.

This project included each of the 6 things in one way or another. While Arrays weren't explicitly used, array functions were used to read in data from the JSON function. Conditionals were used to determine whether the new iterated value is the minimum or maximum. Variables were used extensively to remember certain values such as minimum, average, and maximum. Loops were used to search through the entire graph. Almost everything defined was in a function (for example calculatePeriodData)

The main problems I had were initially getting the sketches to work (the JSON isn't properly formatted) and getting the graphs to switch. (The main reason why the code didn't work was because the brackets were improperly placed, and a bracket only meant for whether the indicator was 0 was covering a function meant for when indicator was 1.) 

## View positive cases with "+/=" and view deaths with "-". A physical keyboard may be required.

# [View this visualization here!](https://covid-history-stats.kingtastic.repl.co)
