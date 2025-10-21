import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import axios from "axios";

function ProfissionalDetalhes() {
  const { id } = useParams();
  const [profissional, setProfissional] = useState(null);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8081/api/profissionais/${id}`)
      .then(res => setProfissional(res.data));

    axios.get(`http://localhost:8081/api/profissionais/${id}/agenda`)
      .then(res => setDatasDisponiveis(res.data));
  }, [id]);

  useEffect(() => {
    if (dataSelecionada) {
      const dataStr = dataSelecionada.toISOString().split('T')[0]; // yyyy-mm-dd
      const data = datasDisponiveis.find(d => d.data === dataStr);
      setHorarios(data ? data.horarios : []);
      setHorarioSelecionado("");
    }
  }, [dataSelecionada, datasDisponiveis]);

  if (!profissional) return <Typography>Carregando...</Typography>;

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 5, padding: 4, border: "1px solid #ccc", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4">{profissional.nome}</Typography>
        <Typography variant="subtitle1">{profissional.especialidade}</Typography>
        <Typography variant="body2" gutterBottom>{profissional.descricao}</Typography>

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            value={dataSelecionada}
            onChange={(newValue) => setDataSelecionada(newValue)}
            shouldDisableDate={(date) => {
              const dataStr = date.toISOString().split('T')[0];
              return !datasDisponiveis.some(d => d.data === dataStr);
            }}
          />
        </LocalizationProvider>

        <Grid container spacing={1} sx={{ marginTop: 2 }}>
          {horarios.map(h => (
            <Grid item key={h}>
              <Button
                variant={horarioSelecionado === h ? "contained" : "outlined"}
                onClick={() => setHorarioSelecionado(h)}
              >
                {h}
              </Button>
            </Grid>
          ))}
        </Grid>

        {horarioSelecionado && (
          <Typography sx={{ marginTop: 2 }}>
            Horário selecionado: {horarioSelecionado}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default ProfissionalDetalhes;
