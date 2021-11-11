import React from "react";
import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { utcDay } from "d3-time";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { MouseCoordinateX, MouseCoordinateY } from "@react-financial-charts/coordinates";

let CandleStickChart = (props) => {
	const { type, width, data, ratio } = props;
	const xAccessor = d => {
      return d.date
    };
  
  // xExtents array is used to set the bounds of X axis. The first element is the left side, and the second is right. For now, 
  // The left element is the date value of the first candle if there are less than 90 candles in the data state, if there are more then 
  // the left element is calculated so that the chart always displays 3 months of candles.
  // the right element is the date value fo the last candle + 17 days. 17 days is needed to create a blank space on the right side of the chart
	const xExtents = [
		data.length < 90 ? xAccessor(data[0]) : xAccessor(data[data.length - 90]),
		new Date(xAccessor(last(data)).getTime() + 86400000 * 17)
	];

  const height = 800;

  var margin = {left: 70, right: 70, top:20, bottom: 30};
  var gridHeight = height - margin.top - margin.bottom;
  var gridWidth = width - margin.left - margin.right;

  var showGrid = true;
  var yGrid = showGrid ? { 
    innerTickSize: -1 * gridWidth,
    tickStrokeDasharray: 'Solid',
    tickStrokeOpacity: 0.2,
    tickStrokeWidth: 1
  } : {};
  var xGrid = showGrid ? { 
    innerTickSize: -1 * gridHeight,
    tickStrokeDasharray: 'Solid',
    tickStrokeOpacity: 0.2,
    tickStrokeWidth: 1
  } : {};

	return (
		<ChartCanvas initialDisplay={300} height={800}
					ratio={ratio}
					width={width}
					margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
					type={type}
					seriesName="MSFT"
					data={data}
					xAccessor={xAccessor}
					xScale={scaleTime()}
					xExtents={xExtents}>

			<Chart id={1} yExtents={d => [d.high, d.low]}>
				<XAxis axisAt="bottom" orient="bottom" ticks={23} {...xGrid} stroke='#2E313E' tickStroke='#ACAFB8'/>
        {/*tickFormat at <YAxis> and displayFormat at <MouseCoordinateY> are used to control the multipliers such as 1x, 2x, 2.5x. For now
        if the number is > 10000 it converts to 1x etc*/}
				<YAxis axisAt="right" orient="right" ticks={5} {...yGrid} stroke='#2E313E' tickFormat={(v) => Math.abs(v) >= 10000 ? (v/10000) + 'x' : v} tickStroke='#ACAFB8'/>
				<CandlestickSeries width={timeIntervalBarWidth(utcDay)} 
            stroke={d => d.close > d.open ? "#26A69A" : "#EF5350"}
						wickStroke={d => d.close > d.open ? "#26A69A" : "#EF5350"}
						fill={d => d.close > d.open ? "#26A69A" : "#EF5350"}
            opacity={1} />
        <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")} />
        <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={((v) => Math.abs(v) >= 10000 ? format('.2f')(v/10000) + 'x' : format('.2f')(v))}
        />
			</Chart>
      
      {/*this is volume chart but I've commented it out since you don't need it. */}

      {/*<Chart id={2}
					yExtents={d => d.volume}
					height={150} origin={(w, h) => [0, h - 150]}
				>
					<YAxis
						axisAt="left"
						orient="left"
						ticks={5}
						tickFormat={format(".2s")}
						zoomEnabled={zoomEvent}
            stroke='#2E313E'
            tickStroke='#ACAFB8'
					/>

					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")} />

					<BarSeries yAccessor={d => d.volume} width={timeIntervalBarWidth(utcDay)} fill="#1C5E5E" opacity={0.9} />
  </Chart>*/}
		</ChartCanvas>
	);
}



CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
