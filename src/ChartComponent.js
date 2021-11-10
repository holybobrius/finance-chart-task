import React, { useEffect, useState } from 'react';
import Chart from './Chart';

const ChartComponent = () => {
  const [data, setData] = useState([{
      date: new Date(2021, 7, 7, 23, 59, 59),
      open: 0,
      close: 0,
      high: 0,
      low: 0,
      volume: 0
  }])
  const addNew = () => {
    setData(data => {
      let _prev = data[data.length - 1];
      let d = new Date(_prev.date.getTime());
      d.setDate(d.getDate() + 1);
      let c = 
        Math.random() > 0.1 ? 
        _prev.close + Math.floor(50 + Math.random() * 200) : 
        _prev.close - Math.floor((d.getTime()/86400000 - _prev.date.getTime()/86400000) * 100 + Math.random() * (d.getTime()/86400000 - _prev.date.getTime()/86400000) * 3000)
      setData([...data, {
        date: d,
        open: _prev.close,
        close: c,
        high: c ? c : _prev.close,
        low: c ? _prev.close : c,
        volume: 0
      }])
      console.log(data)
    })
  }

  useEffect(() => {
    addNew()
    const i = setInterval(addNew, 100);
    return () => clearInterval(i);
  }, [])

  if(!data) return <div>Loading... </div>
  return(
    <Chart data={data} />
  )
}

export default ChartComponent