import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
   
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
   
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
   
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
   
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    
    pv: 4300,
    amt: 2100
  }
];

export default function Assessmentchart() {
  return (
    <div className="font-sans text-center" style={{ margin: "auto", width: "50%" , position:"relative" }}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
       
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
     
    </div>
  );
}
