import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useStatus } from "../services/swr/useStatus";
import { Status } from "../types/Status";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPhone } from "../utils/formatPhone";
import { Loading } from "./Loading";

export function ButtonAddLead({ mutate }: { mutate: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [value, setValue] = useState("R$ 0,00");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoading, data } = useStatus();

  useEffect(() => {
    if (!open) {
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setRole("");
      setStatus("");
      setValue("R$ 0,00");
    }
    setError("");
  }, [open]);

  const handleSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    const { ok, data } = await api.post("/leads", {
      name,
      email,
      phone,
      company,
      value: parseInt(value.replace(/\D/g, "")),
      role,
      statusId: status,
    });

    if (!ok) {
      setError(data.message || "Não foi possível criar o lead.");
    } else {
      setOpen(false);
      mutate();
    }
    setLoading(false);
  };

  return (
    <Box minWidth="max-content">
      <Button variant="contained" onClick={() => setOpen(true)}>
        Novo Lead
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ padding: "10px" }}
      >
        <Container
          maxWidth="sm"
          sx={{
            position: "relative",
            padding: "20px",
            bgcolor: "#fff",
            borderRadius: "10px",
            mt: "20vh",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <Close />
          </IconButton>
          <Stack gap="10px" width="100%">
            <Typography fontSize="18px" fontWeight="bold">
              Novo Lead
            </Typography>
            <Divider />
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              gap="15px"
              onSubmit={handleSave}
            >
              <FormControl fullWidth>
                <TextField
                  size="small"
                  placeholder="Digite o nome do lead"
                  name="name"
                  label="Nome"
                  required
                  value={name}
                  onChange={({ target }) => {
                    setName(target.value);
                  }}
                />
              </FormControl>
              <Box width="100%" display="flex" gap="15px" flexWrap="wrap">
                <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                  <TextField
                    size="small"
                    placeholder="lead@empresa.com"
                    name="email"
                    label="E-mail"
                    value={email}
                    onChange={({ target }) => {
                      setEmail(target.value);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                  <TextField
                    size="small"
                    placeholder="(XX) XXXXX-XXXX"
                    name="phone"
                    label="Telefone"
                    value={phone}
                    inputProps={{ minLength: 14, maxLength: 15 }}
                    onChange={({ target }) => {
                      setPhone(formatPhone(target.value));
                    }}
                  />
                </FormControl>
              </Box>
              <Box width="100%" display="flex" gap="15px" flexWrap="wrap">
                <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                  <TextField
                    size="small"
                    label="Empresa"
                    placeholder="Empresa"
                    name="company"
                    value={company}
                    onChange={({ target }) => {
                      setCompany(target.value);
                    }}
                  />
                </FormControl>
                <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                  <TextField
                    size="small"
                    label="Cargo"
                    placeholder="Cargo"
                    name="role"
                    value={role}
                    onChange={({ target }) => {
                      setRole(target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box width="100%" display="flex" gap="15px" flexWrap="wrap">
                <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                  <TextField
                    size="small"
                    placeholder="R$ 0,00"
                    name="value"
                    label="Valor"
                    value={value}
                    onChange={({ target }) => {
                      const valor = target.value.replace(/\D/g, "");
                      setValue(formatCurrency(parseInt(valor) / 100));
                    }}
                  />
                </FormControl>

                <FormControl sx={{ flex: 1, minWidth: "200px" }}>
                  <TextField
                    select
                    label="Status"
                    size="small"
                    value={status}
                    required
                    onChange={({ target }) => setStatus(target.value)}
                    sx={{ textAlign: "left" }}
                  >
                    <MenuItem value="" disabled>
                      Selecione um status
                    </MenuItem>
                    {!isLoading &&
                      data &&
                      data.map((status: Status) => (
                        <MenuItem key={status.id} value={status.id}>
                          {status.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </FormControl>
              </Box>
              {error && (
                <Typography color="error" textAlign="center" fontSize="14px">
                  {error}
                </Typography>
              )}
              <Button variant="contained" type="submit">
                Salvar
              </Button>
            </Box>
          </Stack>
          {loading && <Loading />}
        </Container>
      </Modal>
    </Box>
  );
}
