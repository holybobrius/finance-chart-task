import React, { useEffect, useState } from 'react';
import Chart from './Chart';
import { getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";

const ChartComponent = () => {
  const [data, setData] = useState()

  useEffect(() => {
    getData().then(res => {
      console.log(res)
      setData(res)
    })
    
  })

  if(!data) return <div>Loading... </div>
  return(
    <Chart data={data} />
  )
}

export default ChartComponent