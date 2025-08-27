import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@mui/material";
import { MailOutline } from "@mui/icons-material";

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
        py: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255,255,255,0.95)",
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#0086c9" }}
          >
            🚀 People Analytics KPIs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Informe seu e-mail corporativo para visualizar o dashboard de
            <br />
            <strong>Headcount</strong> e <strong>Turnover</strong>.
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              textTransform: "none",
              fontWeight: "bold",
              borderRadius: 3,
              background: "linear-gradient(90deg, #0086c9, #065986)",
              color: "white",
              "&:hover": {
                background: "linear-gradient(90deg, #065986, #0086c9)",
              },
            }}
          >
            Ver KPIs
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
