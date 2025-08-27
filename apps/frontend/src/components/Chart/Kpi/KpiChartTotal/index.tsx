import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { formatMonth } from "../../../../utils/date";
import { formatValue } from "../../../../utils/formatValue";

interface Point {
  month: string;
  value: number;
}

interface Props {
  title: string;
  data?: Point[];
  isPercentage?: boolean;
}

export default function KpiChartTotal({ title, data = [], isPercentage = false }: Props) {
  const toNivo = (points: Point[] = []) => points.map((p) => ({ x: p.month, y: p.value }));

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
          <div style={{ height: 400 }}>
            <ResponsiveLine
              data={chartData}
              margin={{ top: 20, right: 30, bottom: 80, left: 70 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", min: 0, max: "auto" }}
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
              isInteractive
              useMesh
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
                    background: "rgba(255, 255, 255, 0.95)",
                    padding: "10px 14px",
                    minWidth: 140,
                    borderRadius: 8,
                    fontSize: 13,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: point.seriesColor,
                        marginRight: 8,
                      }}
                    />
                    <strong style={{ fontSize: 14 }}>{point.seriesId}</strong>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>
                    {formatValue(point.data.y as number, isPercentage)}
                  </div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    {formatMonth(String(point.data.x))}
                  </div>
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
                      {formatValue(p.data.y as number, isPercentage)}
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
