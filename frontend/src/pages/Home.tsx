import { Box, Stack } from "@mui/material";

function Home() {
  return (
    <Box bgcolor="#0e0d1f">
      <Stack
        minHeight="100dvh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          component="img"
          sx={{
            height: "auto",
            width: "160px",
            maxWidth: "100%",
          }}
          alt=""
          src="/logo.png"
        />
      </Stack>
    </Box>
  );
}

export default Home;
