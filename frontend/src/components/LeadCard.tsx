import { AttachMoney, Business, Email, Phone } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Lead } from "../types/Lead";
import { formatCurrency } from "../utils/formatCurrency";

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <Box
      to={`/leads/${lead.id}`}
      component={Link}
      width="100%"
      bgcolor="#fff"
      boxShadow="0 0 14px -7px #777"
      padding="10px"
      borderRadius="10px"
      sx={{
        cursor: "pointer",
        "&:hover,&:active": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Box display="flex" alignItems="center" gap="10px">
        <Avatar sx={{ width: "30px", height: "30px" }}>
          {lead.name.charAt(0).toUpperCase()}
        </Avatar>
        <Stack>
          <Typography fontSize="14px" fontWeight="bold">
            {lead.name}
          </Typography>
          {lead.role && (
            <Typography mt="-3px" fontSize="12px" color="#777">
              {lead.role}
            </Typography>
          )}
        </Stack>
      </Box>
      <Stack gap="10px" mt="20px">
        {lead.email && (
          <Box display="flex" gap="5px" alignItems="center">
            <Email fontSize="small" />
            <Typography fontSize="12px">{lead.email}</Typography>
          </Box>
        )}
        {lead.phone && (
          <Box display="flex" gap="5px" alignItems="center">
            <Phone fontSize="small" />
            <Typography fontSize="12px">{lead.phone}</Typography>
          </Box>
        )}
        {lead.company && (
          <Box display="flex" gap="5px" alignItems="center">
            <Business fontSize="small" />
            <Typography fontSize="12px">{lead.company}</Typography>
          </Box>
        )}
        {lead.value && (
          <Box display="flex" gap="5px" alignItems="center">
            <AttachMoney fontSize="small" />
            <Typography fontSize="12px">
              {formatCurrency(lead.value / 100)}
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
