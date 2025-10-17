import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CadastroPage() {
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    endereco: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState({ tipo: "", texto: "" });
  const navigate = useNavigate();

  // Função para formatar CPF e Telefone
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }

    if (name === "telefone") {
      value = value.replace(/\D/g, "");
      value = value.replace(/(\d{2})(\d)/, "($1) $2");
      value = value.replace(/(\d{5})(\d)/, "$1-$2");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Verifica se CPF já está cadastrado
  const verificarCpfExistente = async (cpf) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/clientes/cpf/${cpf}`
      );
      return response.data !== null;
    // eslint-disable-next-line no-unused-vars
    } catch (erro) {
      return false;
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setMensagem({ tipo: "", texto: "" });

    const cpfLimpo = formData.cpf.replace(/\D/g, "");

    try {
      const cpfExiste = await verificarCpfExistente(cpfLimpo);
      if (cpfExiste) {
        setMensagem({
          tipo: "erro",
          texto: "Este CPF já está cadastrado!",
        });
        return;
      }

      const dadosParaEnvio = { ...formData, cpf: cpfLimpo };
      await axios.post("http://localhost:8081/api/clientes", dadosParaEnvio);

      setMensagem({ tipo: "sucesso", texto: "Cadastro realizado com sucesso!" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      setMensagem({
        tipo: "erro",
        texto: "Erro ao cadastrar. Verifique os dados e tente novamente.",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Cadastro de Cliente
        </Typography>

        {mensagem.texto && (
          <Alert
            severity={mensagem.tipo === "erro" ? "error" : "success"}
            sx={{ width: "100%", mb: 2 }}
          >
            {mensagem.texto}
          </Alert>
        )}

        <form onSubmit={handleCadastro} style={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="nome"
                label="Nome"
                variant="outlined"
                fullWidth
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="cpf"
                label="CPF"
                variant="outlined"
                fullWidth
                value={formData.cpf}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                fullWidth
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="telefone"
                label="Telefone"
                variant="outlined"
                fullWidth
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="endereco"
                label="Endereço"
                variant="outlined"
                fullWidth
                value={formData.endereco}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="senha"
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            Cadastrar
          </Button>
        </form>

        <Button
          variant="text"
          color="secondary"
          sx={{ marginTop: 2 }}
          onClick={() => navigate("/login")}
        >
          Já tem conta? Faça login
        </Button>
      </Box>
    </Container>
  );
}

export default CadastroPage;
