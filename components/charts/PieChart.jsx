"use client";
import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

const data = [
  { name: "Cama Woren", value: 80 },
  { name: "Televisor SONY 4K", value: 50 },
  { name: "Refrigerador MABE", value: 45 },
  { name: "Huawei 7IE", value: 40 },
  { name: "Sofá cama", value: 38 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={-5}
        textAnchor="middle"
        fill={fill}
        className="text-sm"
      >
        {payload.name}
      </text>
      <text x={cx - 25} y={cy + 15} dy={0} className="font-bold" fill={fill}>
        {`${(percent * 100).toFixed(2)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        className="active:outline-none"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

export default class PieChartData extends PureComponent {
  state = {
    activeIndex: 0,
  };

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  onListEnter = (index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
      <div className="w-full row-span-2 bg-gray-50 shadow-md rounded-md ring-1 ring-gray-800/10 p-5 flex flex-col">
        <h4 className="text-xl font-bold  text-gray-700 text-center">
          Producto más populares
        </h4>
        <div className="flex w-full items-center flex-col gap-3">
          <ResponsiveContainer
            height={220}
            maxHeight={220}
            className="w-full h-[220px]"
          >
            <PieChart>
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#4e7cf9"
                className="fill-blue-700"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="w-full flex items-center">
            <ul className="w-full flex flex-col gap-2 cursor-pointer">
              {data.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      this.onListEnter(index);
                    }}
                    className={`w-full py-1 px-4 flex rounded-md items-center gap-4 shadow-md ${
                      this.state.activeIndex == index
                        ? "bg-blue-500"
                        : "bg-blue-100 "
                    }`}
                  >
                    <h1
                      className={`text-lg font-extrabold pr-4 border-r  ${
                        this.state.activeIndex == index
                          ? "text-gray-50 border-gray-200"
                          : "text-gray-700 border-gray-700 "
                      }`}
                    >
                      {index + 1}
                    </h1>
                    <h4
                      className={`text-sm font-regular ${
                        this.state.activeIndex == index
                          ? "text-gray-50 "
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`text-lg font-semibold ml-auto ${
                        this.state.activeIndex == index
                          ? "text-gray-50"
                          : "text-gray-700"
                      }`}
                    >
                      {item.value} <span className="font-regular">U</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
