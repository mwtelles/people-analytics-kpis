import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Scope, useKpis } from "../../../../hooks/useKpis";
import { MonthRangePicker } from "../../../../components/MonthRangePicker.tsx";
import KpiChart from "../../../../components/Chart/Kpi";

interface Props {
  email: string;
  from: string;
  to: string;
}

export default function ChallengeView({ email, from: initialFrom, to: initialTo }: Props) {
  const [scope, setScope] = useState<Scope>("total");
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);

  const { headcount, turnover } = useKpis({ email, from, to, scope });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Dashboard KPIs
          </Typography>
        </Box>

        <Box display="flex" gap={2}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Escopo</InputLabel>
            <Select
              value={scope}
              label="Escopo"
              onChange={(e) => setScope(e.target.value as Scope)}
            >
              <MenuItem value="total">Total</MenuItem>
              <MenuItem value="grouped">Diretos vs Indiretos</MenuItem>
              <MenuItem value="hierarchy">Hierarquia</MenuItem>
            </Select>
          </FormControl>

          <MonthRangePicker
            from={from}
            to={to}
            onChange={(f, t) => {
              setFrom(f);
              setTo(t);
            }}
          />
        </Box>
      </Box>

      {scope === "total" && (
        <>
          <KpiChart title="Headcount" scope="total" total={headcount.total} />
          <KpiChart title="Turnover" scope="total" total={turnover.total} isPercentage />
        </>
      )}

      {scope === "grouped" && "direct" in headcount && "direct" in turnover && (
        <>
          <KpiChart
            title="Headcount"
            scope="grouped"
            total={headcount.total}
            direct={headcount.direct}
            indirect={headcount.indirect}
          />
          <KpiChart
            title="Turnover"
            scope="grouped"
            total={turnover.total}
            direct={turnover.direct}
            indirect={turnover.indirect}
            isPercentage
          />
        </>
      )}

      {scope === "hierarchy" && "reports" in headcount && "reports" in turnover && (
        <>
          <KpiChart
            title="Headcount"
            scope="hierarchy"
            reports={headcount.reports}
            metric="headcount"
          />
          <KpiChart
            title="Turnover"
            scope="hierarchy"
            reports={turnover.reports}
            metric="turnover"
            isPercentage
          />
        </>
      )}
    </Container>
  );
}
