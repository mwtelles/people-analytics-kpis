import { ResponsiveLine } from "@nivo/line";
import { Card, CardContent, Typography } from "@mui/material";
import { formatMonth } from "../../../utils/date";

interface Point {
    month: string;
    value: number;
}

interface KpiChartProps {
    title: string;
    data: Point[];
    color?: string;
    isPercentage?: boolean;
}

export default function KpiChart({
    title,
    data,
    color = "#1976d2",
    isPercentage = false,
}: KpiChartProps) {
    const chartData = [
        {
            id: title,
            color,
            data: data.map((p) => ({
                x: p.month,
                y: p.value,
            })),
        },
    ];

    const formatValue = (val: number) =>
        isPercentage ? `${val.toFixed(1)}%` : `${val}`;

    return (
        <Card sx={{ marginBottom: 4 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <div style={{ height: 340 }}>
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
                        enableGridX={false}
                        enableGridY={true}
                        enablePoints={true}
                        pointSize={10}
                        pointBorderWidth={2}
                        pointColor={color}
                        pointBorderColor="#fff"
                        enableArea
                        areaOpacity={0.15}
                        curve="monotoneX"
                        colors={[color]}
                        tooltip={({ point }) => (
                            <div
                                style={{
                                    background: "white",
                                    padding: "6px 10px",
                                    border: "1px solid #ccc",
                                    fontSize: 12,
                                }}
                            >
                                <strong>{formatMonth(String(point.data.x))}</strong>
                                <br />
                                {isPercentage
                                    ? `${(point.data.y as number).toFixed(1)}%`
                                    : `${point.data.y} pessoas`}
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
                                        fill={color}
                                        fontWeight="bold"
                                    >
                                        {formatValue(p.data.y as number)}
                                    </text>
                                )),
                        ]}

                    />
                </div>
            </CardContent>
        </Card>
    );
}
