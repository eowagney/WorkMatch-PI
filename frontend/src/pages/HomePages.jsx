import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";
import axios from "axios";

function HomePage() {
  const navigate = useNavigate();

  const [profissionais, setProfissionais] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/api/profissionais")
      .then((response) => {
        setProfissionais(response.data);
        const especs = [...new Set(response.data.map(p => p.especialidade))];
        setEspecialidades(especs);
      });
  }, []);

  const profissionaisFiltrados = filtro
    ? profissionais.filter(p => p.especialidade === filtro)
    : profissionais;

  return (
    <Box
      sx={{
        height: "100vh", 
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(180deg, #fff 0%, #f3f3ff 100%)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 2,
          px: 4,
          borderBottom: "3px solid #5C3EF2",
          background: "#fff",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontSize: 60,
              background: "linear-gradient(90deg, #24C6DC, #514A9D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            SELECIONAR PROFISSIONAL
          </Typography>
        </Stack>
        
      </Box>

      {/* Corpo principal */}
      <Container sx={{ flexGrow: 1, py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Profissionais Disponíveis
        </Typography>

        <TextField
          select
          label="Filtrar por especialidade"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          fullWidth
          sx={{ mb: 4 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {especialidades.map((esp, idx) => (
            <MenuItem key={idx} value={esp}>
              {esp}
            </MenuItem>
          ))}
        </TextField>

        <Grid container spacing={3}>
          {profissionaisFiltrados.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  cursor: "pointer",
                  "&:hover": { boxShadow: 6 },
                }}
                onClick={() => navigate(`/profissional/${p.id}`)}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {p.nome}
                  </Typography>
                  <Typography color="text.secondary">
                    {p.especialidade}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Experiência: {p.experienciaAnos} anos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Rodapé */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          background: "#f8f8f8",
          borderTop: "2px solid #5C3EF2",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Work Match — Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;
