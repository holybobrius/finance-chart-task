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
import BarSeries from "react-stockcharts/lib/series/BarSeries";

let CandleStickChart = (props) => {
	const { type, width, data, ratio } = props;
	const xAccessor = d => d.date;
	const xExtents = [
		xAccessor(last(data)),
		xAccessor(data[data.length - 100])
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
		<ChartCanvas height={800}
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
				<XAxis axisAt="bottom" orient="bottom" ticks={23} {...xGrid} />
				<YAxis axisAt="left" orient="left" ticks={5} {...yGrid} />
				<CandlestickSeries width={timeIntervalBarWidth(utcDay)}/>
        <MouseCoordinateX
            at="bottom"
            orient="bottom"
            displayFormat={timeFormat("%Y-%m-%d")} />
        <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")} 
        />
			</Chart>
		</ChartCanvas>
	);
}

CandleStickChart = fitWidth(CandleStickChart);

export default CandleStickChart;
