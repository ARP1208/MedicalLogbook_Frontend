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

export default function Assessmentchart({ array }) {
  const assessments = array? array[0].assessments: null;

  const data = assessments? assessments.map((assessment) => ({
    name: assessment.assessmentName,
    marksObtained: assessment.markObtain,
    totalMarks: assessment.totalMarks
  })): null;

  const maxTotalMarks = data ? Math.max(...data.map((item) => item.totalMarks)) : 0;

  return (
    <div className="font-sans text-center" style={{ margin: "auto", width: "50%", position: "relative" }}>
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
        <YAxis domain={[0, maxTotalMarks]} />
        <Tooltip 
          formatter={(value, name, props) => [`Marks Obtained: ${value}`, `Total Marks: ${props.payload.totalMarks}`]} // Customize tooltip content
        />
        <Legend />
        <Bar dataKey="marksObtained" fill="#8884d8" maxBarSize={80} />
      </BarChart>
    </div>
  );
}
