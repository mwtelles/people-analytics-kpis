import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { formatMonth } from "../../../../utils/date";

interface Point {
  month: string;
  value: number;
}

interface Props {
  title: string;
  data?: {
    total?: Point[];
    direct?: Point[];
    indirect?: Point[];
  };
  isPercentage?: boolean;
}

const COLORS = {
  total: "#1976d2",
  direct: "#2e7d32",
  indirect: "#d32f2f",
};

export default function KpiChartGrouped({ title, data, isPercentage = false }: Props) {
  const toNivo = (points?: Point[]) =>
    (points ?? [])
      .filter((p) => p.value !== null && p.value !== undefined)
      .map((p) => ({ x: p.month, y: Number(p.value) }));

  const chartData = [
    {
      id: "Total",
      color: COLORS.total,
      data: toNivo(data?.total),
    },
    ...(data?.direct
      ? [
          {
            id: "Diretos",
            color: COLORS.direct,
            data: toNivo(data.direct),
          },
        ]
      : []),
    ...(data?.indirect
      ? [
          {
            id: "Indiretos",
            color: COLORS.indirect,
            data: toNivo(data.indirect),
          },
        ]
      : []),
  ].filter((serie) => serie.data.length > 0);

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
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
              yScale={{ type: "linear", min: 0, max: "auto" }}
              xFormat={(value) => formatMonth(String(value), "pt-BR")}
              yFormat={(value) => (isPercentage ? `${(value as number).toFixed(1)}%` : `${value}`)}
              axisBottom={{
                tickRotation: -35,
                legend: "Mês",
                legendOffset: 65,
                legendPosition: "middle",
              }}
              axisLeft={{
                legend: isPercentage ? "Percentual (%)" : "Qtd. Pessoas",
                legendOffset: -60,
                legendPosition: "middle",
              }}
              enablePoints
              pointSize={8}
              pointBorderWidth={2}
              pointBorderColor="#fff"
              enableArea
              areaOpacity={0.15}
              curve="monotoneX"
              colors={(d) => d.color as string}
              isInteractive={true}
              useMesh={true}
              enableSlices="x"
              enableCrosshair={true}
              tooltip={({ point }) => (
                <div
                  style={{
                    background: "white",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: 6,
                    fontSize: 13,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  <strong style={{ color: point.seriesColor }}>{point.seriesId}</strong>
                  <br />
                  {point.data.xFormatted}: {point.data.yFormatted}
                </div>
              )}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 100,
                  itemWidth: 120,
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
