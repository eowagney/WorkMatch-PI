import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          marginTop: 10,
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bem-vindo à tela inicial!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Aqui você pode ver o conteúdo após o login.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/login")}
        >
          Sair
        </Button>
      </Box>
    </Container>
  );
}

export default HomePage;
