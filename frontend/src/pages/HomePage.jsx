import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, MenuItem, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 5, padding: 4, border: "1px solid #ccc", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" gutterBottom>Profissionais Disponíveis</Typography>

        <TextField
          select
          label="Filtrar por especialidade"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          fullWidth
          sx={{ marginY: 2 }}
        >
          <MenuItem value="">Todos</MenuItem>
          {especialidades.map((esp, idx) => (
            <MenuItem key={idx} value={esp}>{esp}</MenuItem>
          ))}
        </TextField>

        <List>
          {profissionaisFiltrados.map((p) => (
            <ListItem key={p.id} disablePadding>
              <ListItemButton onClick={() => navigate(`/profissional/${p.id}`)}>
                <ListItemText primary={`${p.nome} (${p.especialidade})`} secondary={`Experiência: ${p.experienciaAnos} anos`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default HomePage;
