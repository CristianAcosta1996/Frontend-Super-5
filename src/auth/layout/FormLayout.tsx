import { Box } from "@mui/material";

export const FormLayout = ({ children }: any) => {
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
          position: "relative",
          width: 550,
          backgroundColor: "#333",
          py: 2,
          px: 5,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
/* 
https://unbounce.com/photos/Gradient-Background.png
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
          position: "relative",
          width: 650,
          backgroundColor: "#333",
          py: 2,
          px: 5,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>


*/
