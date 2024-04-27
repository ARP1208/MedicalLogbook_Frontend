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

export default function Academicschart({ examMarks }) {
  return (
    <div className="font-sans text-center" style={{ margin: "auto", width: "50%",position:"relative", top:"-30%"}}>
    <BarChart
      width={500}
      height={300}
      data={examMarks}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="subjectName" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="internalMarks" fill="#8884d8" name="Internal Marks" />
      <Bar dataKey="externalMarks" fill="#82ca9d" name="External Marks" />
    </BarChart>
    </div>
  );
}
