import { csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.Date);
		d.open = +d.Open;
		d.high = +d.High;
		d.low = +d.Low;
		d.close = +d.Close;
		d.volume = +d.Volume;
		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d %H:%M:%S");

export function getData() {
	const promiseMSFT = fetch("https://cdn.jsdelivr.net/gh/holybobrius/finance-chart-task@master/coin_Bitcoin.csv")
		.then(response => response.text())
		.then(data => csvParse(data, parseData(parseDate)))
	return promiseMSFT;
}



