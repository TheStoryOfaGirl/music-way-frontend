import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import styles from "./BarChartCustom.module.css";
import { classnames } from "@utils";

interface BarChartCustomProps<T> {
  data: T[];
  layout: "vertical" | "horizontal";
  sizeCategoryAxis: number;
  className?: string;
  color?: "sky" | "blue";
}

export function BarChartCustom<T>({
  data,
  layout,
  sizeCategoryAxis,
  className,
  color = "sky",
}: BarChartCustomProps<T>) {
  return (
    <div
      className={classnames(
        layout === "horizontal"
          ? styles.container_horizontal
          : styles.container_vertical,
        className,
      )}
    >
      <ResponsiveContainer>
        <BarChart
          data={data}
          layout={layout}
          margin={{ top: 0, right: 30, left: 5, bottom: 0 }}
        >
          {layout === "horizontal" ? (
            <CartesianGrid
              horizontalFill={[
                color === "sky" ? "#E8F7FA" : "#F6F6FF",
                "#FFFFFF",
              ]}
            />
          ) : (
            <CartesianGrid
              verticalFill={[
                "#FFFFFF",
                color === "sky" ? "#E8F7FA" : "#F6F6FF",
              ]}
            />
          )}

          {layout === "horizontal" ? (
            <XAxis
              type="category"
              dataKey="name"
              angle={-90}
              height={sizeCategoryAxis}
              textAnchor="end"
              tick={{ fill: "var(--black)" }}
            />
          ) : (
            <XAxis
              type="number"
              domain={[0, 100]}
              tickCount={3}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: "var(--black)" }}
              className="text_20_b"
            />
          )}
          {layout === "horizontal" ? (
            <YAxis
              type="number"
              domain={[0, 100]}
              tickCount={3}
              tickFormatter={(value) => `${value}%`}
              className="text_20_b"
              tick={{ fill: "var(--black)" }}
            />
          ) : (
            <YAxis
              type="category"
              dataKey="name"
              width={sizeCategoryAxis}
              tick={{ fill: "var(--black)" }}
              style={{ overflowWrap: "break-word" }}
            />
          )}
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              backgroundColor: color === "sky" ? "#093440" : "#030743",
              border: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              color: "#fff",
            }}
            itemStyle={{ color: "#fff" }}
            labelStyle={{
              fontWeight: "bold",
              color: color === "sky" ? "#7DD5ED" : "#B2B6F7",
            }}
            cursor={{
              fill: "rgba(144, 153, 155, 0.1)",
            }}
          />
          <Bar
            dataKey="value"
            fill={color === "sky" ? "#7DD5ED" : "#858CF9"}
            barSize={48}
            radius={layout === "horizontal" ? [8, 8, 0, 0] : [0, 8, 8, 0]}
            name="Процент"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
