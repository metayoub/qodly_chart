# Overview
Chart Component for Qodly studio

## Pie & Doughnut Chart

![image info](public/pie.png)

##  Line Chart
A line chart is a way of plotting data points on a line. Often, it is used to show trend data, or the comparison of two data sets.

![image info](public/line.png)

#### Properties

|Name	|Type	|Description	|
|---	|---	|---	|
|`Label`	|String	|The Chart Title.	|
|`Legend Position`	|String	|Defines the position of legend and can be one of the following values: `top`, `bottom`, `left`,`right`,`center`,`chartArea`,`hidden`, The default value is `top`, which means the legend will displayed on Tap of the chart.	|
|`Display grid`	|Boolean	|If set to `false` the grid will disappear	|
|`Display tooltip`	|Boolean	|If set to `false` the tooltip won't appear	|
|`Data`	|DataType	|Contains the properties for chart series   	|
|`Display x-Axis Value`	|Boolean	|If set to `false` the x-Axis will disappear	|
|`Display x-Axis Value`	|Boolean	|If set to `false` the y-Axis will disappear	|

#### DataType
|Name	|Type	|Required	|Description	|
|---	|---	|---	|---	|
|`Label`	|String	|No	|   	|
|`Source`	|String	|Yes	|   	|
|`Background Color`	|Color	|No	|   	|
|`Border Color`	|Color	|No	|   	|
|`Point Color`	|Color	|No	|   	|
|`Point Styles`	|Color	|No	|   	|
|`Point Size`	|String	|No	|   	|
|`Tension`	|Number	|No	|   	|
|`Fill`	|Boolean	|No	|   	|


###  Area Chart
Area Charts are base on line charts with fill = true and the you should set the background color.

###  Scatter Chart
Scatter charts are based on basic line charts with the x-axis changed to a linear axis. To use a scatter chart, the data's border color should be Transparent.

##  Polar Area Chart

![image info](public/polar.png)

##  Bar Chart

### Dumbbell Chart

##  Bubble Chart

Soon ...
##  Radar Chart

##  Mixed Chart 
Soon ...



## TODO
- Add Documentation
- Add examples
- support mixed chart
- make Radar more dynamic
- support radialbar charts
