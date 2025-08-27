import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { formatMonth } from "../../../../utils/date";
import { formatValue } from "../../../../utils/formatValue";

interface Point {
  month: string;
  value: number;
}

interface Report {
  id: number;
  name: string;
  position?: string;
  status: string;
  metrics: {
    headcount?: Point[];
    turnover?: Point[];
  };
}

interface Props {
  title: string;
  reports?: Report[];
  metric: "headcount" | "turnover";
  isPercentage?: boolean;
}

export default function KpiChartHierarchy({
  title,
  reports = [],
  metric,
  isPercentage = false,
}: Props) {
  const toNivo = (points?: Point[]) => (points ?? []).map((p) => ({ x: p.month, y: p.value }));

  const chartData =
    reports.length > 0
      ? reports.map((rep) => ({
          id: rep.name || `Report-${rep.id}`,
          color: stringToColor(rep.name || String(rep.id)),
          data: toNivo(rep.metrics?.[metric]),
        }))
      : [];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title} — Hierarquia
        </Typography>

        {chartData.length === 0 ? (
          <Box
            sx={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.secondary",
              fontStyle: "italic",
            }}
          >
            Nenhum dado disponível para exibir.
          </Box>
        ) : (
          <div style={{ height: 400 }}>
            <ResponsiveLine
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 100, left: 70 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: 0,
                max: isPercentage ? 100 : "auto",
              }}
              axisBottom={{
                tickRotation: -35,
                format: (value) => formatMonth(String(value), "pt-BR"),
                legend: "Mês",
                legendOffset: 65,
                legendPosition: "middle",
              }}
              axisLeft={{
                legend: isPercentage ? "Percentual (%)" : "Qtd. Pessoas",
                legendOffset: -60,
                legendPosition: "middle",
                format: (val: number) => formatValue(val, isPercentage),
              }}
              enablePoints
              pointSize={7}
              pointBorderWidth={2}
              pointBorderColor="#fff"
              curve="monotoneX"
              colors={(d) => d.color as string}
              isInteractive
              useMesh
              enableSlices="x"
              enableCrosshair
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 100,
                  itemWidth: 140,
                  itemHeight: 20,
                  itemsSpacing: 12,
                  symbolSize: 14,
                  symbolShape: "circle",
                  toggleSerie: true,
                },
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 65%, 50%)`;
}
