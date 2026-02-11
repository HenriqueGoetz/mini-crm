import { Box, CircularProgress } from "@mui/material";

export function Loading() {
  return (
    <Box
      position="fixed"
      sx={{ inset: 0 }}
      bgcolor="rgba(0,0,0,0.5)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
