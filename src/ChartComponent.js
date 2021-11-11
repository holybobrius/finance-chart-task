import React, { useEffect, useState } from 'react';
import Chart from './Chart';

const ChartComponent = () => {

  const [autoScroll, setAutoScroll] = useState(false)

  const [data, setData] = useState([{
      date: new Date(2021, 7, 7, 23, 59, 59),
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0
  }])

  // the addNew fucntion triggers every 1s for now, the frequency can be controlled in the setTimeout() down below. 
  const addNew = () => {
    setData(data => {
      let _prev = data[data.length - 1];
      let d = new Date(_prev.date.getTime());
      let high;
      let low;
      d.setDate(d.getDate() + 1);
      let c = 
        Math.random() > 0.1 ? // this controls the chance of the drop - 10% for now.
        _prev.close + Math.floor(50 + Math.random() * 200) : // grow
        _prev.close - Math.floor((d.getTime()/86400000 - _prev.date.getTime()/86400000)
           * 100 + Math.random() * (d.getTime()/86400000 - _prev.date.getTime()/86400000) * 3000) // drop. The amount of drop increases with time
      // this generates high and low values
      if(c > _prev.close) {
        high = c + Math.random() * 300
        low = _prev.close - Math.random() * 300
      } else {
        high = _prev.close + Math.random() * 300
        low = c - Math.random() * 300
      }
      setData([...data, {
        date: d,
        open: _prev.close,
        close: c,
        high: high,
        low: low,
        volume: 0
      }])
    })
  }

  useEffect(() => {
    addNew()
    const i = setInterval(addNew, 100);
    return () => clearInterval(i);
  }, [])

  if(!data) return <div>Loading... </div>
  return(
    <div>
      <Chart data={data} autoScroll={autoScroll} />
      <button onClick={() => setAutoScroll(!autoScroll)}>autoScroll</button>
    </div>
  )
}

export default ChartComponent