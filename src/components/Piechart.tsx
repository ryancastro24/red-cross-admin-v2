import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Chart configuration
const chartConfig = {
  total: {
    label: "Total",
  },
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
};

// Define the props interface
interface GenderData {
  gender: string;
  total: number;
  fill: string;
}

interface PiechartProps {
  genders: GenderData[] | null;
}

export default function Piechart({ genders }: PiechartProps) {
  // Calculate total trainees
  const totalTrainees = React.useMemo(() => {
    return genders ? genders.reduce((acc, curr) => acc + curr.total, 0) : 0;
  }, [genders]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Trainees</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={genders || []} // Ensure the data is never undefined
              dataKey="total"
              nameKey="gender"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }: any) => {
                  if (
                    viewBox &&
                    typeof viewBox.cx === "number" &&
                    typeof viewBox.cy === "number"
                  ) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTrainees.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy + 24}
                          className="fill-muted-foreground"
                        >
                          Trainees
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total trainees for this year
        </div>
      </CardFooter>
    </Card>
  );
}
