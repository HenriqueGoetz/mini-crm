import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box bgcolor="#0e0d1f">
      <Stack
        minHeight="100dvh"
        width="100%"
        alignItems="center"
        justifyContent="center"
        color="#fff"
        gap="10px"
      >
        <Typography fontSize="32px" fontWeight="bold">
          404
        </Typography>
        <Typography fontSize="28px">Página não encontrada</Typography>
        <Typography>
          A página que você está tentando acessar não existe ou foi movida.
        </Typography>
        <Button to="/" component={Link} variant="contained">
          Voltar para Home
        </Button>
      </Stack>
    </Box>
  );
}

export default Home;
