"use client";

import type { ReactElement } from "react";

import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { BarChartProps, CustomYAxisLabelProps } from "@/types/charts";

function CustomXAxisTick(props: any) {
  const { x, y, payload } = props;
  const words = payload.value.split(" ");

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        textAnchor="middle"
        fill="#333"
        fontSize={12}
        fontWeight={500}
        dominantBaseline="hanging" // ✅ start from top instead of centered
      >
        {words.map((word: string, index: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <tspan x={0} dy={index === 0 ? 0 : 14} key={index}>
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
}

const CustomYAxisLabel: React.FC<CustomYAxisLabelProps> = ({ viewBox, position, label }) => {
  const { x, y, width, height } = viewBox;

  const centerY = y + height / 2;
  const isLeft = position === "left";

  // Dynamic offset from axis line
  const offset = 10;

  // Final X position based on side
  const xPos = isLeft ? x + offset : x + width + offset;

  // Rotation direction
  const rotate = isLeft ? -90 : 90;

  return (
    <g transform={`translate(${xPos}, ${centerY})`}>
      <text
        transform={`rotate(${rotate})`}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={14}
        fontWeight={600}
        fill="#333"
      >
        {label}
      </text>
    </g>
  );
};

function CombinedChart(props: BarChartProps): ReactElement {
  const {
    title = "",
    xAxisLabel = "",
    yAxisLabel = "",
    data,
    emptyLabel = "No data available.",
  } = props;

  const theme = useTheme();

  const mappedData = data.map(item => ({ ...item, name: `${item.roleName}: CL-${item.careerLevel}` }));

  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Use ResizeObserver to track actual width of container
  useEffect(() => {
    const element = containerRef.current;
    if (!element)
      return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(element);

    // Cleanup
    return () => observer.disconnect();
  }, []);

  // Dynamically adjust interval or angle based on width
  const xAxisProps = containerWidth < 450
    ? { interval: 3, angle: -60, dy: 10 } // skip every 3rd tick
    : containerWidth < 600
      ? { interval: 2, angle: -45, dy: 10 } // skip every 2nd tick and rotate
      : containerWidth < 900
        ? { interval: 1, angle: -30, dy: 10 } // skip every other tick
        : { interval: 0 }; // show all ticks

  const hasData = Array.isArray(data) && data.length > 0;

  const dataMax: number = _.maxBy(data ?? [], "demandWon")?.benchCount ?? 0;
  const dataMin: number = _.minBy(data ?? [], "demandWon")?.benchCount ?? 0;

  return (
    <Box sx={{ mt: 4 }} ref={containerRef}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: 400 }}>
        {hasData
          ? (
              <ResponsiveContainer>
                <ComposedChart
                  data={mappedData}
                  margin={{ top: 20, bottom: 90 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="name"
                    angle={0}
                    textAnchor="end"
                    height={80}
                    tick={<CustomXAxisTick />}
                    label={{
                      value: xAxisLabel,
                      position: "insideBottom",
                      offset: -50,
                      fill: theme.palette.text.secondary,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                    {...xAxisProps}
                  />

                  <YAxis
                    domain={[dataMin, dataMax]}
                    tick={{
                      fill: theme.palette.text.primary,
                      fontSize: 12,
                    }}
                    label={(props: any) => (
                      <CustomYAxisLabel
                        {...props}
                        label={yAxisLabel}
                        position="left"
                      />
                    )}
                    orientation="left"
                  />

                  <Tooltip />
                  <Legend verticalAlign="top" align="center" />

                  <Bar dataKey="benchCount" name="Bench Count" fill="#FF8B00" stroke="#FF8B00" />
                </ComposedChart>
              </ResponsiveContainer>
            )
          : (
              <div
                style={{
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #ccc",
                }}
              >
                <span>{emptyLabel}</span>
              </div>
            )}

      </Box>
    </Box>
  );
}

export default CombinedChart;
