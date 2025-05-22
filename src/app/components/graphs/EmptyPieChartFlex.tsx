import { graphData } from "@/app/global";
import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface EmptyPieChartFlexProps {
  dataType?: string;
  labelOn?: Boolean;
  innerRadius? : string;
  outerRadius?: string;
  startAngle?: number;
  endAngle?: number;
  cy?: string;
  cx?: string;
}

export default function EmptyPieChartFlex({
  labelOn = true,
  innerRadius = "0%",
  outerRadius = "80%",
  startAngle = 0,
  endAngle = 360,
  cy = "50%",
  cx = "50%",
  dataType = "money"
}: EmptyPieChartFlexProps) {
  const emptydata = [{name: "empty", value: 1}]
  return (
    <div className="h-full w-full">
      <ResponsiveContainer
        width="100%"
        height="100%"
        className={"flex items-center justify-center"}
      >
        <PieChart>
          <Pie
            data={emptydata}
            dataKey="value"
            nameKey="name"
            cx={cx}
            cy={cy}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            startAngle={startAngle}
            endAngle={endAngle}
            fill={"#808080"}
          >

            {labelOn && dataType === "money" && (
              <Label
                position="center"
                value={"$0"}
                className="fill-current text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold"
              />
            )}

            {labelOn && dataType === "number" && (
              <Label
                position="center"
                value={0 + " transactions"}
                className="fill-current text-black text-base sm:text-lg md:text-xl lg:text-xl font-semibold"
              />
            )}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}