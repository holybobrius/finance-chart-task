import React from "react";
import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { utcDay, utcHour } from "d3-time";
import { ChartCanvas, Chart } from "react-stockcharts";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";
import { MouseCoordinateX, MouseCoordinateY } from "@react-financial-charts/coordinates";
import BarSeries from "react-stockcharts/lib/series/BarSeries";

let CandleStickChart = (props) => {
	const { type, width, data, ratio } = props;
   const { mouseMoveEvent, panEvent, zoomEvent, zoomAnchor } = props;
	const xAccessor = d => {
      return d.date
    };
	const xExtents = [
		data.length < 90 ? xAccessor(data[0]) : xAccessor(data[data.length - 90]),
		new Date(xAccessor(last(data)).getTime() + 86400000 * 17)
	];

  console.log(xExtents)

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
  console.log(width)

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
				<YAxis axisAt="right" orient="right" ticks={5} {...yGrid} stroke='#2E313E' tickFormat={(v) => v >= 10000 ? (v/10000) + 'x' : v} tickStroke='#ACAFB8'/>
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
            displayFormat={((v) => v >= 10000 ? format('.2f')(v/10000) + 'x' : format('.2f')(v))}
        />
			</Chart>
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
