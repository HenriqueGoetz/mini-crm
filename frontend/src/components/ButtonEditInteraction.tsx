import { Close, Edit } from "@mui/icons-material";
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
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { Interaction } from "../types/Interaction";
import { formatDateForInput } from "../utils/formatDateForInput";
import { parseInputToDate } from "../utils/parseInputToDate";
import { Loading } from "./Loading";

export function ButtonEditInteraction({
  interaction,
  mutate,
}: {
  interaction: Interaction;
  mutate: () => void;
}) {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setType(interaction.type);
      setNotes(interaction.notes);
      setDate(new Date(interaction.date));
    } else {
      setType("");
      setNotes("");
      setDate(new Date());
    }
    setError("");
  }, [open, interaction]);

  const handleSave = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { ok, data } = await api.patch(
      `/leads/${id}/interactions/${interaction.id}`,
      {
        type,
        notes,
        date: date.toISOString(),
      },
    );

    if (!ok) {
      setError(data.message || "Não foi possível atualizar a interação.");
    } else {
      setOpen(false);
      mutate();
    }
    setLoading(false);
  };

  return (
    <>
      <IconButton color="warning" onClick={() => setOpen(true)}>
        <Edit />
      </IconButton>
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
              Editar Interação
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
                  select
                  label="Status"
                  size="small"
                  value={type}
                  required
                  onChange={({ target }) => setType(target.value)}
                  sx={{ textAlign: "left" }}
                >
                  <MenuItem value="" disabled>
                    Selecione um tipo
                  </MenuItem>
                  <MenuItem value="meeting">Reunião</MenuItem>
                  <MenuItem value="call">Ligação</MenuItem>
                  <MenuItem value="email">E-mail</MenuItem>
                  <MenuItem value="other">Outro</MenuItem>
                </TextField>
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  label="Anotações"
                  multiline
                  rows={4}
                  fullWidth
                  value={notes}
                  onChange={({ target }) => setNotes(target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  size="small"
                  label="Data do Evento"
                  type="datetime-local"
                  value={formatDateForInput(date)}
                  onChange={(e) => setDate(parseInputToDate(e.target.value))}
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
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
    </>
  );
}
