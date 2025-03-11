
"use client"

import * as React from "react"
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BarChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter,
  className,
}: BarChartProps) {
  return (
    <ChartContainer
      className={className}
      config={{
        index: { label: index },
        ...Object.fromEntries(
          categories.map((category, i) => [
            category,
            {
              label: category,
              color: colors[i % colors.length],
            },
          ])
        ),
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 12,
            right: 16,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={(value) => 
              valueFormatter ? valueFormatter(value) : value
            }
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={8}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                // Pass the formatter as a prop to the content component
                formatter={(value) => 
                  valueFormatter ? valueFormatter(value) : value
                }
              />
            }
          />
          {categories.map((category, i) => (
            <Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
