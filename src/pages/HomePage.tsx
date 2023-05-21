import { Avatar, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

export const HomePage = () => {
  const navigate = useNavigate();

  const { imageUrl } = useAppSelector((state) => state.auth);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar src={imageUrl !== null ? imageUrl : ""} />
      Homepage
      <br />
      <Button
        variant="contained"
        onClick={() => {
          navigate("/auth/login");
        }}
      >
        Iniciar sesion
      </Button>
    </Box>
  );
};
