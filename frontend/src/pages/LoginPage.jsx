import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:8081/api/login", {
      cpf: cpf,
      senha: password,
    });

    console.log("Usuário logado:", response.data);
    alert(`Bem-vindo, ${response.data.nome}!`);
    navigate("/home");
  } catch (error) {
    console.error("Erro no login:", error);
    alert("CPF ou senha inválidos!");
  }
};

  const handleRegister = () => {
  navigate("/cadastro"); 
};

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh", 
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
      }}
    >
      <Card
        sx={{
          width: "100%",
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h1"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label="CPF"
              variant="outlined"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 1,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#1565c0" },
              }}
            >
              Entrar
            </Button>

            <Button
              onClick={handleRegister}
              variant="outlined"
              size="large"
              sx={{
                mt: 1,
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": {
                  backgroundColor: "#e3f2fd",
                  borderColor: "#1565c0",
                },
              }}
            >
              Criar Conta
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default LoginPage;
