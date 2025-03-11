
"use client"

import * as React from "react"
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface LineChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#2563eb"],
  valueFormatter,
  className,
}: LineChartProps) {
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
        <RechartsLineChart
          data={data}
          margin={{
            top: 12,
            right: 16,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey={index}
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={8}
          />
          <YAxis
            tickFormatter={(value) => 
              valueFormatter ? valueFormatter(Number(value)) : value
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
                  valueFormatter && typeof value === 'number' ? valueFormatter(value) : value
                }
              />
            }
          />
          {categories.map((category, i) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 0, fill: colors[i % colors.length] }}
              activeDot={{ r: 6, strokeWidth: 0, fill: colors[i % colors.length] }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
