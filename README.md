# Visualization

1. Basic Info. The project title, your names, e-mail addresses, student number, a link to the project URL (this link should provide all files of your project).
- Project URL: https://glanonim.com/Archive/visualization/
- Project Git: https://github.com/glanonim/visualization/
- Title: Visualization of CO2 emission score per country
- Creators:
  - Franziska Schmidt, franziska_paula.schmidt@smail.fh-koeln.de, student number: 11084555,
  - Krzysztof Dabrowski, krzysztof_jedrzej.dabrowski@smail.th-koeln.de, student number: 11137957,
  - Kyung Hee Lee, kyung_hee.lee@smail.th-koeln.de, student number: 1111598516,

2. Background and Motivation. Discuss your motivations and reasons for choosing this project, especially any background or research interests that may have influenced your decision.

The motivation of this project is the current discussion about global warming. Currently we develope an app to improve the environmental behaivoir of people. It is important in order to change something to know the reasons for the climate change. One reason is the co2 pollution. To understand the co2 pollution one has to consider the emerge during the years. Furthermore the distribution of co2 emission in the world will give interesting insights about the activities of the individual countries. 



3. Related Work. Anything that inspired you, such as a paper, a web site, visualisations we discussed in class, etc.
4. Project Objectives and Goals. Provide the primary questions you are trying to answer with your visualisation. What would you like to learn and accomplish? List the benefits.
5. Data. From where and how are you collecting your data? If appropriate, provide a link to your data sources.
6. Data Processing. Do you expect to do substantial data cleanup? What quantities do you plan to derive from your data? How would data processing be implemented?
7. Visualisation Design. How will you display your data? Provide some general ideas that you have for the visualisation design. Develop three alternative prototype designs for your visualisation. Discuss the pros and cons of each design. Create one final design that incorporates the best of your three designs. Describe your designs and justify your choices of visual encodings. We recommend you use the

The visual design was developed by considering Edward
R. Tufte's heuristics and principles.
"Graphical excellent is that which gives to the
viewer the greatest number of ideas in the shortest time with the least ink in the
smallest space."\cite{Tufte2001} The least ink ratio hints to one of Tufte's heuristics, which is "maximize the data Ink ratio. \\
$\frac{data-ink}{total ink used to print the graphic (data-ink + non data-ink)}$
\newline The relationship between the data ink which is the ink used for the data itself (key informations) and the total amount of ink of the whole visualisation form the data ink ratio.
That means that visualisations should be as simple as possible while showing all relevant information.
The other heuristics are:
\begin{itemize}
    \item Avoid chart junk 
\item Increase data-density 
\item Layering of information
\end{itemize}{}
Our visualization is divided into two parts. The first part is the CO2 - Emission of one or more countries over the years. Firstly the information is displayed on a map. Colour is used to show the CO2 emission of a country in millions of tons. The colour span is going from grey to different shades of purple. The darker the purple the higher the amount of co2 is. The colour purple was chosen because there shouldn't be a judgement implicated by the chosen colour. Furthermore the implementation tool only allows two colours. 
"To avoid chart junk" the interactive elements are shared with the different visualization. When they are once chosen by the user they are valid for all of the visualizations. They are placed next to the central visualization (the map), because it is the first thing a user should do. The map has two serving purposes for the whole visualization. First of all it gives an overview about the co2 emissions of the country. Secondly it is an interactive element for the user to select the countries he would like to know more about. This encourages the experimentation and exploration, because it is more playful than selecting the countries in a list. The map is also visually more attractive than a list. Nevertheless, a list of countries is placed on the left hand side of the map. This supports the users in finding and selecting a specific country they are looking for. For some user it might also be hard to select small countries on a map. Although a zooming function is available. Shneiderman Mantra „Overview first, zoom and filter, then details-on-demand“ helped to find the design solution. The map gives the overview and the zoom supports the user later. The "details on demand" is there as well, because the countries react on hovering over the countries. Additional information are displayed then like the countries name. The colour purple represents "co2 emission per country". The Map also offers "co2 emission per km2 of a country area" and "co2 emission per citizen of a country". This options can be chosen in a legend beneath the map on the right hand side. When changing to another option the whole map and reference information change to the colour blue or turquoise. The colour options all belong to the blue colour group. Blue is associated also with air. Which matches the content but is at the same time also not implicating a judging. 
Another interaction with the map is a timeline year selector. The user can select the year he wants to look at the data. Furthermore he can click on a play-button to see a automated timeselection. He sees the evolution of co2 of the different countries over the different years. 
With the Interaction Tufte’s Integrity Principles:
"Show data variation, not design variation" and  
"Clear, detailed, and thorough labeling should be used to defeat graphical distortion and ambiguity" \cite{Tufte2001} are followed. The different variations who can be chosen by the user are data variations and not design varitaions.  

 
         
8. Five Design Sheet Methodology (fds.design).
9. Tasks. Describe in detail which data manipulations (sort, filter,..) and visual manipulations (zoom, selection,…) you would want to implement and how these support the goals.
10. Must-Have Features. List the features without which you would consider your project to be a failure. These should be related to your final design.
11. Optional Features. List the features which you consider to be nice to have, but not critical. These should be related to your final design.
12. Project Schedule. Make sure that you plan your work so that you can avoid a big rush right before the final project deadline, and delegate different modules and responsibilities among your team members. Write your schedule in terms of weekly deadlines.

13. Implementation details. List what tools/frameworks you used to implement your interactive visualisation. List the difficulties you encountered. List which of the desired features are implemented and which are missing.

During brainstorming session we talked for long time how we can provide good interaction for most users at reasonable development time. We decied to create 1-page website. 

Our objectives when considering possible frameworks and technolgies:
\begin{itemize}
\item We would prefer to load raw data to avoid corruption
\item We would use CSV files available publicly
\item We know HTML, CSS and JavaScript
\item We do not know how to generate charts and would like to show them
\end{itemize}{}

Most time we spend on aligning concept of page, how should it look and on finding JavaScript library that would be able to generate such visualization. After hours of research few JavaScript libraries were selected that worked with jQuery and would fit our data structure.

Following frameworks and technologies were used:
\begin{itemize}
\item HTML5 and CSS3 
\item Bootstrap Framework to provide common UI elements
\item JavaScript (with ES6) with jQuery framework
\item amCharts library for charts
\item PapaParse (library for jQuery) to process raw data saved in CSV files
\end{itemize}{}
Based on selected technologies work was divided into following milestones:
\begin{itemize}
\item Decide datasets and charts
\item Prepare mock-up 
\item Align mock-up
\item Load data for map
\item Display map
\item Select countries
\item Load and process data for countries
\item Display radar charts
\item Display stacked charts
\item Optimization
\item Final review
\end{itemize}{}

Personally two items from list above were particulary painfull - aligning on mock-up and loading and processing data for countries. Every team member had different expectation and wanted to have "best" visualization. After all it was difficult to focus on finishing what we defined rather than planning new changes.

Data was loaded as object, maps required different formats of objects.

To sustain clean code following main functions were planned:
\begin{itemize}
\item Load map data and display countries list
\item Switch map category
\item Process data
\item Load data for map 
\end{itemize}{}

Data between function was being stored in localStorage. It turned out to be very helpful as amChart functions were preventing to access many external variables.

Maps from amCharts are working based on 2-letters countries codes. It means that after adding to final array/object respective 2-letter coutry code, country will be drawn on the map. All data sets were based on ISO 3-letters codes. Separate dataset "c1.csv" was used to translate one code to the other and to keep consistent countries naming.


14. Work Breakdown Structure (e.g. matrix) with a statement which project member did which part of the structure to what extend.

# Detailed displays
1. Area of the country in this year
2. Number of citizens in this year and country
3. Generated CO2 amount in this year and country

Transportation:

4. Amount of passengers in this year and country
5. Amount of air travel per citizen
(new) #1.CO2 emissions from transport (%of total fuel combusion) by 2014

Forestation:

6. Area of forests in this year and country

Energy:
(new) #2. CO2 emissions from electricity and heat production, total (% of total fuel combustion) by 2014
(new) #6. Total fossil fuels and cement by 2018

Residential building & commercial and public services:
(new) #3. CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)

Manufacturing industries & construction:
(new) #4. CO2 emissions from manufacturing industries and construction (% of total fuel combustion)

Agricultural:
(new) #5. Agricultural methane emissions (thousand metric tons of CO2 equivalent)

Waste:
(new) #7. CO2 from Waste by 2016

# Milestones
1. Close mock-up - Kris, All - this week, 08.12.2019
2. Clean and close data - Kaylee - this week, 10.12.2019
3. Make the magic - 22.12.2019
4. Validation and hapiness check - All - January
5. GitHub draft - Franziska - January
6. Overleaf document - Franziska - January
- Kris please add Data manipulation and Implementation details
- Kyung Hee please add Data informations
7. Poster - for now All - January
  - Screenshots 
  - Explain each part (Navigation Interaction)
  - Theory
  - Data

# Libraries
1. Parsing CSV to JSON: https://www.papaparse.com/docs 
2. Charts: https://www.amcharts.com/docs/v4/chart-types/xy-chart/
  - Map: https://www.amcharts.com/demos/drill-down-to-countries/
  - Funnel: https://www.amcharts.com/demos/funnel-chart/
  
# Data sources
1. 2019/W22: CO2 Emissions per capita: https://data.world/makeovermonday/2019w22
2. Population: https://data.world/oecd/population/workspace/file?filename=population.csv
3. Countries area: https://data.worldbank.org/indicator/AG.SRF.TOTL.K2
4. Forest area per country: https://data.worldbank.org/indicator/AG.LND.FRST.ZS
5. Air passengers per year: https://data.worldbank.org/indicator/IS.AIR.PSGR
6. (Update) CO2 from Total fossil fuels and cement (by 2018) : https://www.climatewatchdata.org/ghg-emissions?source=50
7. (Update) #1 CO2 emissions from transport (% of total fuel combustion) : https://data.worldbank.org/indicator/EN.CO2.TRAN.ZS
8. (Update) #2 CO2 emissions from electricity and heat production, total (% of total fuel combustion) : https://data.worldbank.org/indicator/EN.CO2.ETOT.ZS
9. (Update) #3 CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion) : https://data.worldbank.org/indicator/EN.CO2.BLDG.ZS
10. (Update) #4 CO2 emissions from manufacturing industries and construction (% of total fuel combustion) : CO2 emissions from manufacturing industries and construction (% of total fuel combustion) : https://data.worldbank.org/indicator/EN.CO2.MANF.ZS
11. (Update) #5. Agricultural methane emissions (thousand metric tons of CO2 equivalent) : 
https://data.worldbank.org/indicator/EN.ATM.METH.AG.KT.CE
12. (Update) #6. Total fossil fuels and cement by 2018 : 
https://www.climatewatchdata.org/embed/ghg-emissions?source=50
13. (Update) #7. CO2 from Waste by 2016 : https://www.climatewatchdata.org/data-explorer/historical-emissions?historical-emissions-data-sources=47&historical-emissions-end_year=2016&historical-emissions-gases=190&historical-emissions-regions=&historical-emissions-sectors=577&page=1&sort_col=gas&sort_dir=ASC
