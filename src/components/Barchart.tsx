import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the shape of a city data object
interface CityData {
  address: string;
  standard: number;
  occupational: number;
}

// Define the props for the Barchart component
interface BarchartProps {
  cities: CityData[];
}

const chartConfig: Record<string, { label: string; color?: string }> = {
  views: {
    label: "Trainees",
  },
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  occupational: {
    label: "Occupational",
    color: "hsl(var(--chart-2))",
  },
};

export default function Barchart({ cities }: BarchartProps) {
  const [activeChart, setActiveChart] = React.useState<
    "standard" | "occupational"
  >("standard");

  const total = React.useMemo(() => {
    if (!cities || cities.length === 0) return { standard: 0, occupational: 0 };
    return {
      standard: cities.reduce((acc, curr) => acc + curr.standard, 0),
      occupational: cities.reduce((acc, curr) => acc + curr.occupational, 0),
    };
  }, [cities]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Red Cross Trainees</CardTitle>
          <CardDescription>Showing total trainees by city</CardDescription>
        </div>
        <div className="flex">
          {["standard", "occupational"].map((key) => {
            const chart = key as "standard" | "occupational";
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart]?.label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={cities}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="address"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: string) => value}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value: string) => value}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
