import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

export function Login() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    const { ok, data } = await api.post("/login", {
      username: username,
      password: password,
    });

    if (ok) {
      login(data.token, data.username);
    } else {
      setError(data.message || "Não foi possível realizar seu login.");
    }
    setLoading(false);
  };

  return (
    <>
      <Box bgcolor="#0e0d1f">
        <Stack
          minHeight="100dvh"
          width="100%"
          alignItems="center"
          justifyContent="center"
          padding="10px"
        >
          <Container
            maxWidth="xs"
            sx={{ bgcolor: "#fff", padding: "20px", borderRadius: "10px" }}
          >
            <Typography
              component="h1"
              fontSize="32px"
              fontWeight="bold"
              textAlign="center"
              mb="20px"
            >
              Entrar
            </Typography>
            <Stack
              width="100%"
              component="form"
              gap="15px"
              onSubmit={handleLogin}
            >
              <FormControl fullWidth>
                <TextField
                  required
                  label="Username"
                  size="small"
                  name="username"
                  placeholder="Informe seu username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  required
                  label="Senha"
                  type="password"
                  size="small"
                  name="password"
                  placeholder="Informe sua senha"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </FormControl>
              {error && (
                <Typography color="error" textAlign="center" fontSize="14px">
                  {error}
                </Typography>
              )}
              <Button fullWidth type="submit" variant="contained">
                Entrar
              </Button>
            </Stack>
            <Stack gap="10px" width="100%" marginTop="20px">
              <Typography textAlign="center">
                Ainda não tem uma conta?
              </Typography>
              <Button
                fullWidth
                to="/register"
                component={Link}
                variant="outlined"
              >
                Cadastre-se
              </Button>
            </Stack>
          </Container>
        </Stack>
      </Box>
      {loading && <Loading />}
    </>
  );
}

export default Login;
