import {
  AttachMoney,
  Business,
  Delete,
  Email,
  Phone,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ButtonAddInteraction } from "../components/ButtonAddInteraction";
import { ButtonEditInteraction } from "../components/ButtonEditInteraction";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { useLead } from "../services/swr/useLead";
import { Interaction } from "../types/Interaction";
import { formatCurrency } from "../utils/formatCurrency";
import { getInteractionNicename } from "../utils/getInteractionNicename";

function Lead() {
  const { id } = useParams();
  const { isLoading, data, mutate } = useLead(parseInt(id as string));
  const lead = !isLoading && data;
  const [loading, setLoading] = useState(false);

  const handleRemove = async (interactionId: number) => {
    if (!window.confirm("Tem certeza que deseja remover essa interação?")) {
      return;
    }

    setLoading(true);
    const { ok, data } = await api.delete(
      `/leads/${id}/interactions/${interactionId}`,
    );
    if (!ok) {
      alert(data.message || "Não foi possível remover a interação.");
    } else {
      mutate();
    }
    setLoading(false);
  };

  return (
    <Box bgcolor="#0e0d1f">
      <Stack minHeight="100dvh" width="100%" gap="30px">
        <Header />
        <Container maxWidth="xl">
          <Box display="flex" width="100%" mb="20px">
            <Button
              to="/"
              component={Link}
              variant="contained"
              color="primary"
              sx={{ marginLeft: "auto" }}
            >
              Voltar
            </Button>
          </Box>
          {loading || (isLoading && <Loading />)}
          {!isLoading && lead && (
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
              gap="20px"
              flexWrap="wrap"
            >
              <Stack
                flex="1"
                gap="20px"
                paddingBottom="40px"
                bgcolor="#fff"
                padding="20px"
                borderRadius="10px"
                minWidth="340px"
                maxWidth="400px"
              >
                <Box display="flex" alignItems="center" gap="10px">
                  <Avatar sx={{ width: "60px", height: "60px" }}>
                    {lead.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Stack>
                    <Typography fontSize="16px" fontWeight="bold">
                      {lead.name}
                    </Typography>
                    {lead.role && (
                      <Typography mt="-3px" fontSize="16px" color="#777">
                        {lead.role}
                      </Typography>
                    )}
                  </Stack>
                </Box>
                <Stack gap="10px">
                  {lead.email && (
                    <Box display="flex" gap="5px" alignItems="center">
                      <Email fontSize="small" />
                      <Typography fontSize="16px">{lead.email}</Typography>
                    </Box>
                  )}
                  {lead.phone && (
                    <Box display="flex" gap="5px" alignItems="center">
                      <Phone fontSize="small" />
                      <Typography fontSize="16px">{lead.phone}</Typography>
                    </Box>
                  )}
                  {lead.company && (
                    <Box display="flex" gap="5px" alignItems="center">
                      <Business fontSize="small" />
                      <Typography fontSize="16px">{lead.company}</Typography>
                    </Box>
                  )}
                  {lead.value && (
                    <Box display="flex" gap="5px" alignItems="center">
                      <AttachMoney fontSize="small" />
                      <Typography fontSize="16px">
                        {formatCurrency(lead.value / 100)}
                      </Typography>
                    </Box>
                  )}
                </Stack>
              </Stack>
              <Stack
                gap="20px"
                paddingBottom="40px"
                bgcolor="#fff"
                padding="20px"
                borderRadius="10px"
                flex="1"
                minWidth="340px"
              >
                <Box
                  display="flex"
                  gap="10px"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Typography fontSize="18px" fontWeight="bold">
                    Interações
                  </Typography>
                  <ButtonAddInteraction mutate={mutate} />
                </Box>
                <Stack gap="10px">
                  {lead.interactions.map((interaction: Interaction) => (
                    <Stack
                      key={interaction.id}
                      gap="10px"
                      padding="10px"
                      bgcolor="#f5f5f5"
                      borderRadius="10px"
                    >
                      <Box
                        display="flex"
                        gap="10px"
                        alignItems="center"
                        justifyContent="space-between"
                        flexWrap="wrap"
                      >
                        <Typography fontSize="14px" fontWeight="bold">
                          {getInteractionNicename(interaction.type)} - (
                          {new Date(interaction.date).toLocaleString("pt-BR")})
                        </Typography>
                        <Box display="flex" gap="10px" alignItems="center">
                          <ButtonEditInteraction
                            interaction={interaction}
                            mutate={mutate}
                          />
                          <IconButton
                            color="error"
                            onClick={() => handleRemove(interaction.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography fontSize="14px">
                        {interaction.notes}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>
          )}
        </Container>
      </Stack>
    </Box>
  );
}

export default Lead;
