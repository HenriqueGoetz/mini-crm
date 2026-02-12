import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components/Loading";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

export function Register() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [crmPassword, setCrmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    if (password !== confPassword) {
      setError("Senha e confirmação de senha não conferem.");
      return;
    }

    setLoading(true);
    const { ok, data } = await api.post("/register", {
      username,
      password,
      crmPassword,
    });

    if (ok) {
      login(data.token, data.username);
    } else {
      setError(data.message || "Não foi possível realizar seu cadastro.");
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
            >
              Cadastro
            </Typography>
            <Stack
              width="100%"
              component="form"
              gap="10px"
              onSubmit={handleRegister}
            >
              <FormControl fullWidth>
                <FormLabel>Username</FormLabel>
                <TextField
                  required
                  size="small"
                  name="username"
                  placeholder="Informe seu username"
                  value={username}
                  onChange={({ target }) => setUsername(target.value.trim())}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Senha</FormLabel>
                <TextField
                  required
                  type="password"
                  size="small"
                  name="password"
                  placeholder="Informe sua senha"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Confirmação de Senha</FormLabel>
                <TextField
                  required
                  type="password"
                  size="small"
                  name="confPassword"
                  placeholder="Confirme sua senha"
                  value={confPassword}
                  onChange={({ target }) => setConfPassword(target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel>Senha do CRM</FormLabel>
                <TextField
                  required
                  type="password"
                  size="small"
                  name="crmPassword"
                  placeholder="Insira a senha do CRM para fazer o cadastro"
                  value={crmPassword}
                  onChange={({ target }) => setCrmPassword(target.value)}
                />
              </FormControl>

              {error && (
                <Typography color="error" textAlign="center" fontSize="14px">
                  {error}
                </Typography>
              )}
              <Button fullWidth type="submit" variant="contained">
                Cadastrar
              </Button>
            </Stack>
            <Stack gap="10px" width="100%" marginTop="10px">
              <Typography textAlign="center">Já tem uma conta?</Typography>
              <Button fullWidth to="/login" component={Link} variant="outlined">
                Entrar
              </Button>
            </Stack>
          </Container>
        </Stack>
      </Box>
      {loading && <Loading />}
    </>
  );
}

export default Register;
