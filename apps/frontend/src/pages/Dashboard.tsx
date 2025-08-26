import { useQuery } from "@tanstack/react-query";
import { Route } from "../routes/dashboard";
import { getHeadcount, getTurnover } from "../services/kpis";
import KpiChart from "../components/Chart/Kpi";
import LoadingScreen from "../components/Loading/LoadingScreen";
import { Container, Typography, Box, Alert } from "@mui/material";

export default function Dashboard() {
  const { email, from, to } = Route.useSearch();

  const {
    data: headcount,
    isLoading: loadingHeadcount,
    isError: errorHeadcount,
  } = useQuery({
    queryKey: ["kpis", "headcount", email, from, to],
    queryFn: () => getHeadcount(email, from, to),
  });

  const {
    data: turnover,
    isLoading: loadingTurnover,
    isError: errorTurnover,
  } = useQuery({
    queryKey: ["kpis", "turnover", email, from, to],
    queryFn: () => getTurnover(email, from, to),
  });

  if (loadingHeadcount || loadingTurnover) {
    return <LoadingScreen />;
  }

  if (errorHeadcount || errorTurnover) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">
          Erro ao carregar dados de KPIs. Tente novamente mais tarde.
        </Alert>
      </Container>
    );
  }

  if (!headcount || !turnover) return null;

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Dashboard de KPIs
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Escopo: <strong>{email}</strong> — Período {from} até {to}
        </Typography>
      </Box>

      <KpiChart
        title="Headcount"
        data={headcount.series}
        color="#1976d2"
        isPercentage={false}
      />

      <KpiChart
        title="Turnover"
        data={turnover.series}
        color="#d32f2f"
        isPercentage={true}
      />
    </Container>
  );
}
