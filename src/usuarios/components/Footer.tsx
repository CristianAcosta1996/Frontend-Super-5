import { Box, Typography, Link } from "@mui/material";
import { FaInstagram } from "react-icons/fa";
import { AiFillFacebook } from "react-icons/ai";

export const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        py: 4,
        px: 2,
        justifyContent: "space-between",
      }}
      bgcolor="#1976D2"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Link
          color="inherit"
          underline="none"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          Nosotros
        </Link>
        <Link
          color="inherit"
          underline="none"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          Sucursales
        </Link>
        <Link
          color="inherit"
          underline="none"
          sx={{ "&:hover": { cursor: "pointer" } }}
        >
          Terminos y condiciones
        </Link>
      </Box>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Link
            color="inherit"
            underline="none"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <AiFillFacebook size={25} />
          </Link>
          <Link
            color="#fff"
            underline="none"
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <FaInstagram size={25} />
          </Link>
        </Box>
        <Typography color="inherit">
          &copy; Todos los derechos reservados por Super5
        </Typography>
      </Box>
    </Box>
  );
};
