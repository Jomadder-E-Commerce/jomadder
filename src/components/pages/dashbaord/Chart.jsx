"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieCharts } from "./Piechart";

export const description = "A multiple bar chart for order statuses";

// Chart data for orders status
const chartData = [
  { month: "January", approved: 186, pending: 80, rejected: 20 },
  { month: "February", approved: 305, pending: 50, rejected: 10 },
  { month: "March", approved: 237, pending: 120, rejected: 15 },
  { month: "April", approved: 73, pending: 60, rejected: 30 },
  { month: "May", approved: 209, pending: 90, rejected: 40 },
  { month: "June", approved: 214, pending: 100, rejected: 25 },
];

// Configuration for each order status color
const chartConfig = {
    approved: {
      label: "Approved",
      color: "hsl(var(--chart-3))",
    },
    pending: {
      label: "Pending",
      color: "hsl(var(--chart-2))",
    },
    rejected: {
      label: "Rejected",
      color: "hsl(var(--chart-1))",
    },
  };

export function Chart() {
  return (
   <div className="">
    <div className="">
    <Card className=" !rounded-lg">
      <CardHeader>
        <CardTitle>Order Status Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="approved" fill="var(--color-approved)" radius={4} />
            <Bar dataKey="pending" fill="var(--color-pending)" radius={4} />
            <Bar dataKey="rejected" fill="var(--color-rejected)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing order statuses for the last 6 months
        </div>
      </CardFooter>
    </Card>
    </div>
   </div>
  );
}
