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
  Snackbar,
  Alert,
} from "@mui/material";
import { MailOutline } from "@mui/icons-material";
import { checkEmail } from "../services/employees";

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { from, to } = defaultRange();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await checkEmail(email);

      if (data.valid) {
        navigate({
          to: "/dashboard",
          search: { email: data.email ?? email, from, to },
        });
      }
    } catch (err: any) {
      console.log("erro", err);
      if (err.response.data.valid === false) {
        setError("E-mail não encontrado na base.");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 20vh)",
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

        <form onSubmit={handleSubmit}>
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
            disabled={loading}
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
            {loading ? "Verificando..." : "Ver KPIs"}
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}
