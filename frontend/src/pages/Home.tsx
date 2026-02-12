import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { ButtonAddLead } from "../components/ButtonAddLead";
import { Header } from "../components/Header";
import { LeadCard } from "../components/LeadCard";
import { Loading } from "../components/Loading";
import { useLeads } from "../services/swr/useLeads";
import { ColumnStatus } from "../types/ColumnStatus";
import { Lead } from "../types/Lead";
import { formatCurrency } from "../utils/formatCurrency";

function Home() {
  const { isLoading, data, mutate } = useLeads();

  return (
    <Box bgcolor="#0e0d1f">
      <Stack minHeight="100dvh" width="100%" gap="30px">
        <Header />
        <Container maxWidth="xl">
          {isLoading && <Loading />}
          {!isLoading && data && (
            <>
              <ButtonAddLead mutate={mutate} />
              <Box
                display="flex"
                gap="10px"
                width="100%"
                overflow="auto"
                maxWidth="100%"
                paddingBottom="10px"
              >
                {data.map((column: ColumnStatus) => {
                  const value = column.leads.reduce(
                    (acc: number, lead: Lead) => {
                      return acc + (lead.value || 0);
                    },
                    0,
                  );
                  return (
                    <Stack
                      minWidth="240px"
                      flex="1"
                      key={column.id}
                      title={column.name}
                      bgcolor="#fff"
                      borderRadius="10px"
                      padding="10px"
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
                        {formatCurrency(value / 100)} - {column.leads.length}{" "}
                        {column.leads.length === 1 ? "item" : "itens"}
                      </Typography>
                      <Divider />
                      {column.leads.map((lead: Lead) => (
                        <LeadCard key={lead.id} lead={lead} />
                      ))}
                    </Stack>
                  );
                })}
              </Box>
            </>
          )}
        </Container>
      </Stack>
    </Box>
  );
}

export default Home;
