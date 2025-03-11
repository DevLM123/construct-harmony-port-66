
"use client"

import * as React from "react"
import { Pie, PieChart as RechartsPieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface PieChartProps {
  data: any[]
  index: string
  category: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  className?: string
}

export function PieChart({
  data,
  index,
  category,
  colors = ["#2563eb", "#4f46e5", "#8b5cf6", "#a855f7"],
  valueFormatter,
  className,
}: PieChartProps) {
  const customColors = data.map((item) => item.fill || colors[data.indexOf(item) % colors.length])

  return (
    <ChartContainer
      className={className}
      config={{
        index: { label: index },
        category: { label: category },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
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
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40}
            paddingAngle={2}
            startAngle={90}
            endAngle={-270}
            label={(props) => props.name}
            labelLine={{ stroke: "none" }}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={customColors[index]} />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
