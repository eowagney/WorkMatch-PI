import { Box, Button, Container, Typography, Grid, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WorkIcon from "@mui/icons-material/Work";

function InicioPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh", 
        width: "100vw",
        background: "linear-gradient(180deg, #fff 0%, #f3f3ff 100%)",
        display: "flex",
        flexDirection: "column",
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
          <WorkIcon sx={{ color: "#5C3EF2", fontSize: 36 }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #24C6DC, #514A9D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WORK MATCH
          </Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => navigate("/login")}
          sx={{
            background: "linear-gradient(90deg, #514A9D, #24C6DC)",
            borderRadius: "20px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Login / Cadastro
        </Button>
      </Box>

      {/* Corpo principal */}
      <Container sx={{ flexGrow: 1, py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Texto */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ color: "#555", mb: 1 }}>
              Encontre o que{" "}
              <Typography component="span" sx={{ color: "#5C3EF2", fontWeight: 500 }}>
                você precisa
              </Typography>
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: 800, lineHeight: 1.3, mb: 2 }}
            >
              Encontre o profissional ideal para o que{" "}
              <Typography component="span" sx={{ color: "#5C3EF2" }}>
                você precisa.
              </Typography>
            </Typography>

            <Typography sx={{ color: "#555", mb: 3 }}>
              De pequenos serviços a grandes reformas, tudo na ponta dos dedos.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/profissionais")}
              sx={{
                background: "linear-gradient(90deg, #24C6DC, #514A9D)",
                textTransform: "none",
                borderRadius: "12px",
                px: 4,
                py: 1.2,
              }}
            >
              Buscar Profissionais
            </Button>

            <Typography sx={{ mt: 5, fontWeight: 600 }}>
              Acompanhe-nos:
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(90deg, #514A9D, #24C6DC)",
                }}
              />
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(90deg, #514A9D, #24C6DC)",
                }}
              />
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(90deg, #514A9D, #24C6DC)",
                }}
              />
            </Stack>
          </Grid>

          {/* Imagem */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="/images/trabalhador.png" 
              alt="Trabalhador"
              sx={{
                width: "80%",
                maxWidth: 400,
                borderRadius: "16px",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>
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

export default InicioPage;
