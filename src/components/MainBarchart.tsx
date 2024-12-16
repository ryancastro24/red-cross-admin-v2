import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export const description = "An interactive bar chart";

const year = new Date().getFullYear();

const chartConfig = {
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  occupational: {
    label: "Occupational",
    color: "hsl(var(--chart-2))",
  },
};

// Define the prop types for the component
interface BarData {
  month: string;
  standard: number;
  occupational: number;
  standardGender?: {
    male: number;
    female: number;
  };
  occupationalGender?: {
    male: number;
    female: number;
  };
}

interface PerMonthChartProps {
  users: BarData[];
}

export default function MainBarchart({ users }: PerMonthChartProps) {
  const [activeChart, setActiveChart] = React.useState<
    "standard" | "occupational"
  >("standard");
  const [popoverVisible, setPopoverVisible] = React.useState(false);
  const [popoverPosition, setPopoverPosition] = React.useState({
    top: 0,
    left: 0,
  });
  const [selectedBarData, setSelectedBarData] = React.useState<BarData | null>(
    null
  );
  // const [loading, setLoading] = React.useState(true);

  const total = React.useMemo(() => {
    return {
      standard: users.reduce((acc, curr) => acc + curr.standard, 0),
      occupational: users.reduce((acc, curr) => acc + curr.occupational, 0),
    };
  }, [users]);

  const handleBarClick = (
    data: unknown,
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    const { clientX, clientY } = e;

    // Explicitly cast 'data' to 'BarData'
    const barData = data as BarData;

    setPopoverPosition({ top: clientY, left: clientX });
    setSelectedBarData(barData);
    setPopoverVisible(true);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Number of Trainees per Month</CardTitle>
          <CardDescription>
            Showing total Trainees for the year {year}
          </CardDescription>
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
                  {chartConfig[chart].label}
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
            data={users}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(`${value}-01`);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    const date = new Date(`${value}-01`);
                    return date.toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar
              onClick={(data, _, e) => {
                if (e instanceof MouseEvent) {
                  handleBarClick(data, e); // Pass `data` and the event properly
                }
              }}
              className="cursor-pointer"
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
            />
          </BarChart>
        </ChartContainer>

        {popoverVisible && (
          <Popover open={popoverVisible} onOpenChange={setPopoverVisible}>
            <PopoverTrigger asChild>
              <div
                style={{
                  position: "absolute",
                  top: popoverPosition.top,
                  left: popoverPosition.left,
                  width: "1px",
                  height: "1px",
                }}
              />
            </PopoverTrigger>

            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Trainee Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Details for{" "}
                    {activeChart.charAt(0).toUpperCase() + activeChart.slice(1)}{" "}
                    chart
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label>Male</label>
                    <p className="col-span-2">
                      {activeChart === "standard"
                        ? selectedBarData?.standardGender?.male || "N/A"
                        : selectedBarData?.occupationalGender?.male || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label>Female</label>
                    <p className="col-span-2">
                      {activeChart === "standard"
                        ? selectedBarData?.standardGender?.female || "N/A"
                        : selectedBarData?.occupationalGender?.female || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </CardContent>
    </Card>
  );
}
