import { Box, Button, Container, Typography } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <Box width="100%" bgcolor="#fff">
      <Container maxWidth="lg" sx={{ padding: "10px" }}>
        <Box
          width="100%"
          display="flex"
          gap="10px"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography fontSize="24px" fontWeight="bold">
            Mini-CRM
          </Typography>
          <Box display="flex" gap="10px" alignItems="center">
            <Typography>Olá, {user}!</Typography>
            <Button variant="text" size="small" onClick={logout}>
              Sair
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
