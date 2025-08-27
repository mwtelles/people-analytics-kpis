import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { formatMonth } from "../../../../utils/date";

interface Point {
  month: string;
  value: number;
}

interface Props {
  title: string;
  data?: Point[];
  isPercentage?: boolean;
}

export default function KpiChartTotal({
  title,
  data = [],
  isPercentage = false,
}: Props) {
  const toNivo = (points: Point[] = []) =>
    points.map((p) => ({ x: p.month, y: p.value }));

  const formatValue = (val: number) =>
    isPercentage ? `${val.toFixed(1)}%` : `${val}`;

  const chartData = [
    {
      id: title,
      color: "#1976d2",
      data: toNivo(data),
    },
  ];

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>

        {chartData[0].data.length === 0 ? (
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
          <div style={{ height: 360 }}>
            <ResponsiveLine
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 50, left: 70 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: "auto", max: "auto" }}
              axisBottom={{
                tickRotation: -35,
                format: (value) => formatMonth(String(value), "pt-BR"),
                legend: "Mês",
                legendOffset: 40,
                legendPosition: "middle",
              }}
              axisLeft={{
                legend: isPercentage ? "Percentual (%)" : "Qtd. Pessoas",
                legendOffset: -60,
                legendPosition: "middle",
                format: formatValue,
              }}
              enablePoints
              pointSize={9}
              pointBorderWidth={2}
              pointBorderColor="#fff"
              enableArea
              areaOpacity={0.15}
              curve="monotoneX"
              colors={(d) => d.color as string}
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
                  <strong>{point.seriesId}</strong>
                  <br />
                  {formatMonth(String(point.data.x))}:{" "}
                  {formatValue(point.data.y as number)}
                </div>
              )}
              layers={[
                "grid",
                "markers",
                "areas",
                "lines",
                "points",
                "mesh",
                "axes",
                "legends",
                ({ points }) =>
                  points.map((p) => (
                    <text
                      key={p.id}
                      x={p.x}
                      y={p.y - 12}
                      textAnchor="middle"
                      fontSize={11}
                      fill={p.seriesColor}
                      fontWeight="bold"
                    >
                      {formatValue(p.data.y as number)}
                    </text>
                  )),
              ]}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
