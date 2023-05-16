import { Box } from "@mui/material";

export const LoginLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: 700,
          backgroundColor: "#333",
          py: 2,
          px: 5,
          borderRadius: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
