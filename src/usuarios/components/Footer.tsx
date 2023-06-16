import { Box, Typography, Link } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        px: 1,
        py: 2,
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
        }}
      >
        <Link color="inherit">Nosotros</Link>
        <Link color="inherit">Sucursales</Link>
        <Link color="inherit">Terminos y condiciones</Link>
      </Box>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Link color="inherit">Facebook</Link>
          <Link color="inherit">Instagram</Link>
        </Box>
        <Typography color="inherit">
          &copy; Todos los derechos reservados por Super5
        </Typography>
      </Box>
    </Box>
  );
};
