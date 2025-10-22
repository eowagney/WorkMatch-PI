import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
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
  const [, setHorariosOcupados] = useState([]);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8081/api/profissionais/${id}`)
      .then(res => setProfissional(res.data))
      .catch(err => console.error(err));

    axios.get(`http://localhost:8081/api/profissionais/${id}/agenda`)
      .then(res => setDatasDisponiveis(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    if (!dataSelecionada) {
      setHorarios([]);
      return;
    }

    const dataStr = dataSelecionada.toISOString().split("T")[0];
    const data = datasDisponiveis.find(d => d.data === dataStr);

    if (!data) {
      setHorarios([]);
      return;
    }

    axios.get(`http://localhost:8081/api/profissionais/${id}/agendamentos?data=${dataStr}`)
      .then(res => {
        const ocupados = res.data.map(a => a.horario);
        setHorariosOcupados(ocupados);

        const horariosLivres = data.horarios.filter(h => !ocupados.includes(h));
        setHorarios(horariosLivres);
        setHorarioSelecionado("");
      })
      .catch(err => console.error(err));
  }, [dataSelecionada, datasDisponiveis, id]);

  const handleConfirmarAgendamento = () => {
    const clienteId = "id-do-cliente-logado"; 
    axios.post("http://localhost:8081/api/agendamentos", {
      cliente: { id: clienteId },
      profissional: { id },
      data: dataSelecionada.toISOString().split("T")[0],
      horario: horarioSelecionado,
    })
    .then(() => alert("Agendamento confirmado!"))
    .catch(err => console.error(err));
  };

  if (!profissional) return <Typography>Carregando...</Typography>;

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
              fontSize: 50,
              background: "linear-gradient(90deg, #24C6DC, #514A9D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PERFIL DO PROFISSIONAL
          </Typography>
        </Stack>
      </Box>

      <Container sx={{ flexGrow: 1, py: 6 }}>
        <Card sx={{ p: 4, borderRadius: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {profissional.nome}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {profissional.especialidade}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {profissional.descricao}
            </Typography>

            <Grid container spacing={4}>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptBR}>
                  <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    value={dataSelecionada}
                    onChange={(newValue) => setDataSelecionada(newValue)}
                    shouldDisableDate={(date) => {
                      const dataStr = date.toISOString().split("T")[0];
                      return !datasDisponiveis.some(d => d.data === dataStr);
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6} container justifyContent="flex-end">
                <Box sx={{ width: "100%", maxWidth: 300 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Horários disponíveis
                  </Typography>

                  <Grid container spacing={1}>
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

                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 25 }}
                    disabled={!horarioSelecionado}
                    onClick={handleConfirmarAgendamento}
                  >
                    Confirmar Agendamento
                  </Button>

                  {horarioSelecionado && (
                    <Typography sx={{ mt: 2 }}>
                      Horário selecionado: {horarioSelecionado}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
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

export default ProfissionalDetalhes;
