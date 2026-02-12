import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Box,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { ButtonAddLead } from "../components/ButtonAddLead";
import { Header } from "../components/Header";
import { LeadCard } from "../components/LeadCard";
import { Loading } from "../components/Loading";
import { api } from "../services/api";
import { useLeads } from "../services/swr/useLeads";
import { useStatus } from "../services/swr/useStatus";
import { ColumnStatus } from "../types/ColumnStatus";
import { Lead } from "../types/Lead";
import { Status } from "../types/Status";
import { formatCurrency } from "../utils/formatCurrency";

function Home() {
  const [selectedStatuses, setSelectedStatuses] = useState<
    number[] | undefined
  >([1, 2, 3, 4, 5]);
  const { isLoading: isLoadingStatus, data: dataStatus } = useStatus();
  const { isLoading, data, mutate } = useLeads(selectedStatuses);

  function toggleStatus(id: number) {
    setSelectedStatuses((prev: any) =>
      prev.includes(id) ? prev.filter((p: any) => p !== id) : [...prev, id],
    );
  }

  async function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (!data) {
      return;
    }

    const sourceColumnId = parseInt(source.droppableId);
    const destColumnId = parseInt(destination.droppableId);

    const newColumns = data.map((col) => ({ ...col, leads: [...col.leads] }));
    const sourceColumn = newColumns.find((c) => c.id === sourceColumnId);
    const destColumn = newColumns.find((c) => c.id === destColumnId);

    if (!sourceColumn || !destColumn) {
      return;
    }

    const [moved] = sourceColumn.leads.splice(source.index, 1);
    destColumn.leads.splice(destination.index, 0, moved);

    mutate(newColumns, false);

    try {
      await api.patch(`/leads/${draggableId}`, {
        name: moved.name,
        email: moved.email || "",
        phone: moved.phone || "",
        company: moved.company || "",
        role: moved.role || "",
        value: moved.value || 0,
        statusId: destColumnId,
      });
      mutate();
    } catch (err) {
      mutate();
    }
  }

  return (
    <Box bgcolor="#0e0d1f">
      <Stack minHeight="100dvh" width="100%" gap="30px">
        <Header />
        <Container maxWidth="xl">
          {isLoading || (isLoadingStatus && <Loading />)}
          {data && (
            <>
              <Box bgcolor="#fff" padding="10px" borderRadius="10px" mb="20px">
                {!isLoadingStatus && dataStatus && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="10px"
                    flexWrap="wrap"
                  >
                    <Box flex="1" minWidth="340px">
                      <Typography fontSize="18px" color="#777">
                        Seleciona os colunas que deseja visualizar:
                      </Typography>
                      <FormGroup row>
                        {dataStatus.map((s: Status) => (
                          <FormControlLabel
                            key={s.id}
                            control={
                              <Checkbox
                                checked={selectedStatuses?.includes(s.id)}
                                onChange={() => toggleStatus(s.id)}
                              />
                            }
                            label={s.name}
                          />
                        ))}
                      </FormGroup>
                    </Box>
                    <ButtonAddLead mutate={mutate} />
                  </Box>
                )}
              </Box>
              <DragDropContext onDragEnd={onDragEnd}>
                <Box
                  display="flex"
                  gap="10px"
                  width="100%"
                  overflow="auto"
                  maxWidth="100%"
                  paddingBottom="10px"
                >
                  {data?.map((column: ColumnStatus) => {
                    const value = column.leads.reduce(
                      (acc: number, lead: Lead) => {
                        return acc + (lead.value || 0);
                      },
                      0,
                    );
                    return (
                      <>
                        <Stack
                          minWidth="240px"
                          maxWidth="340px"
                          flex="1"
                          title={column.name}
                          bgcolor="#fff"
                          borderRadius="10px"
                          padding="10px 10px 0 10px"
                          gap="10px"
                        >
                          <Typography fontSize="18px" textAlign="center">
                            {column.name}
                          </Typography>
                          <Typography
                            fontSize="12px"
                            color="#777"
                            mt="-10px"
                            textAlign="center"
                          >
                            {formatCurrency(value / 100)} -{" "}
                            {column.leads.length}{" "}
                            {column.leads.length === 1 ? "item" : "itens"}
                          </Typography>
                          <Divider />
                          <Droppable
                            droppableId={String(column.id)}
                            key={column.id}
                          >
                            {(provided) => (
                              <Box
                                sx={{ flex: 1 }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                              >
                                {column.leads.map(
                                  (lead: Lead, index: number) => (
                                    <Draggable
                                      draggableId={String(lead.id)}
                                      index={index}
                                      key={lead.id}
                                    >
                                      {(providedDraggable) => (
                                        <Box
                                          bgcolor="#fff"
                                          borderRadius="10px"
                                          boxShadow="0 0 14px -10px #777"
                                          padding="10px"
                                          mb="10px"
                                          sx={{
                                            transition:
                                              "background-color 0.25s",
                                            "&:hover, &:active": {
                                              backgroundColor: "#d4eaff",
                                            },
                                          }}
                                          ref={providedDraggable.innerRef}
                                          {...providedDraggable.draggableProps}
                                          {...providedDraggable.dragHandleProps}
                                        >
                                          <LeadCard lead={lead} />
                                        </Box>
                                      )}
                                    </Draggable>
                                  ),
                                )}
                                {provided.placeholder}
                              </Box>
                            )}
                          </Droppable>
                        </Stack>
                      </>
                    );
                  })}
                </Box>
              </DragDropContext>
            </>
          )}
        </Container>
      </Stack>
    </Box>
  );
}

export default Home;
