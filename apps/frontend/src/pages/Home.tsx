import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

function defaultRange() {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - 11);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return {
    from: fmt(new Date(start.getFullYear(), start.getMonth(), 1)),
    to: fmt(new Date(end.getFullYear(), end.getMonth() + 1, 0)),
  };
}

export default function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { from, to } = defaultRange();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            🚀 People Analytics KPIs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Informe seu e-mail corporativo para visualizar o dashboard de
            Headcount e Turnover.
          </Typography>
        </Box>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({
              to: "/dashboard",
              search: { email, from, to },
            });
          }}
        >
          <TextField
            type="email"
            label="E-mail"
            variant="outlined"
            fullWidth
            required
            placeholder="seu.email@empresa.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Ver KPIs
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
