import React, { PureComponent } from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

const data = [
  {
    name: "Food",
    uv: 31.47,
    pv: 2400,
    fill: "#8884d8",
  },
  {
    name: "Rent",
    uv: 26.69,
    pv: 4567,
    fill: "#83a6ed",
  },
  {
    name: "Utilities",
    uv: 15.69,
    pv: 1398,
    fill: "#8dd1e1",
  },
  {
    name: "Insurance",
    uv: 8.22,
    pv: 9800,
    fill: "#82ca9d",
  },
  {
    name: "Entertainment",
    uv: 8.63,
    pv: 3908,
    fill: "#a4de6c",
  },

  {
    name: "Miscellaneous",
    uv: 6.67,
    pv: 4800,
    fill: "#ffc658",
  },
];

const style = {
  top: "30%",
  right: 0,
  transform: "translate(0, -50%)",
  lineHeight: "24px",
};

const Pie = () => {
  return (
    <RadialBarChart
      width={500}
      height={300}
      cx={180}
      cy={150}
      innerRadius={20}
      outerRadius={140}
      barSize={10}
      data={data}
    >
      <RadialBar
        label={{ position: "insideStart", fill: "#fff" }}
        background
        dataKey="uv"
      />
      <Legend
        iconSize={10}
        width={120}
        height={140}
        layout="vertical"
        verticalAlign="middle"
        wrapperStyle={style}
      />
    </RadialBarChart>
  );
};

export default Pie;
