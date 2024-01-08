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
|`DataSource`	|Array	|The dataSource that contains data to display.	|
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
|`Label`	|String	|No	|The label for the dataset which appears in the legend and tooltips.	|
|`Source`	|String	|Yes	|The attribut name using for mapping data from the DataSource	|
|`Background Color`	|Color	|No	|The line fill color. If it's empty, a random color is generated	|
|`Border Color`	|Color	|No	|The line color. if it's empty it will take background color instead.	|
|`Point Color`	|Color	|No	|The fill color for points. if it's empty it will take background color instead.	|
|`Point Styles`	|Color	|No	|Style of the point	and can be one of the following values: `circle`,`cross`,`crossRot`,`dash`,`line`,`rect`,`rectRounded`,`rectRot`,`star`,`triangle`, `none`|
|`Point Size`	|String	|No	|The radius of the point shape. If set to 0, the point is not rendered. default value is `5`	|
|`Tension`	|Number	|No	|Bezier curve tension of the line. Set to 0 to draw straightlines, default value is `0`. Example : `0.3`	|
|`Fill`	|Boolean	|No	|If set to `true`, the line chart, the line chart become Area chart.	|

#### DataSource
```
[{x: "Value 1", y: 10}, {x: "Value 2", y: 25}, ...]

[{x: "Value 1", y: 10, z: 20}, {x: "Value 2", y: 25, z: 40}, ...]

[{x: "Value 1", source1: 10, source2: 20, ...}, {x: "Value 2", source1: 25, source2: 40, ...}, ...]

```

- `y, z, source1, source2 will be used in the source field to map data`

###  Area Chart
Area Charts are base on line charts with fill = true and the you should set the background color.

##  Polar Area Chart

![image info](public/polar.png)

##  Bar Chart

###  Scatter Chart
Scatter charts are based on basic line charts with the x-axis changed to a linear axis. To use a scatter chart, the data's border color should be Transparent.

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
