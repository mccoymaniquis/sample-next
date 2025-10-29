"use client";

import type { ReactElement } from "react";

import {
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ChartProps } from "@/types/charts";

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

function CombinedChart(props: ChartProps): ReactElement {
  const {
    title = "Chart",
    xAxisLabel = "",
    yAxisLabel = "",
    data,
  } = props;

  const theme = useTheme();

  const mappedData = data.map(item => ({ ...item, name: `${item.roleFamily}: CL-${item.careerLevel}` }));

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

  return (
    <Box sx={{ mt: 4 }} ref={containerRef}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <ComposedChart
            data={mappedData}
            margin={{ top: 20, left: 20, bottom: 90 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              angle={0}
              textAnchor="end"
              //   interval={0}
              height={80}
              tick={<CustomXAxisTick />}
              label={{
                value: xAxisLabel,
                position: "insideBottom",
                offset: -50,
                fill: theme.palette.text.secondary,
                fontSize: 12,
                fontWeight: 600,
              }}
              {...xAxisProps}
            />

            <YAxis
              yAxisId="left"
              tick={{
                fill: theme.palette.text.primary,
                fontSize: 12,
              }}
              label={{
                value: yAxisLabel,
                angle: -90,
                fill: theme.palette.text.secondary,
                fontSize: 16,
                fontWeight: 600,
              }}
              orientation="left"
            />
            <YAxis
              yAxisId="right"
              tick={{
                fill: theme.palette.text.primary,
                fontSize: 12,
              }}
              label={{
                value: yAxisLabel,
                angle: 90,
                fill: theme.palette.text.secondary,
                fontSize: 16,
                fontWeight: 600,
              }}
              orientation="right"
            />

            <Tooltip />
            <Legend verticalAlign="top" align="center" />

            <Bar yAxisId="left" dataKey="demand" name="Demand Count" fill="#407CF1" />
            <Line
              yAxisId="right"
              dataKey="benchAfterWon"
              name="Bench After Won"
              fill="#FF8B00"
              stroke="#FF8B00"
              strokeWidth={3}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default CombinedChart;
