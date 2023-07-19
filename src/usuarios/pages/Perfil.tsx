import {
  Box,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserDataQuery } from "../../store/super5/super5Api";
import MapIcon from "@mui/icons-material/Map";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

export const Perfil = () => {
  const navigate = useNavigate();
  const { data: userData } = useGetUserDataQuery();

  const [name, setName] = useState(userData?.nombre);
  const [surname, setSurname] = useState(userData?.apellido);
  const [phone, setPhone] = useState(userData?.telefono);
  const [mail, setMail] = useState(userData?.correo);
  const [fechaNac, setFechaNac] = useState(
    userData?.fechaNacimiento?.toString().slice(0, -19)
  );
  const [nacimiento, setNacimiento] = useState<Dayjs>(dayjs(fechaNac));

  useEffect(() => {
    if (userData) {
      setName(userData.nombre);
      setSurname(userData.apellido);
      setPhone(userData.telefono);
      setMail(userData.correo);
      setFechaNac(userData?.fechaNacimiento?.toString().slice(0, -19));
      setNacimiento(dayjs(fechaNac));
    }
  }, [userData, fechaNac]);

  const handleDatosPersonales = () => {
    navigate("/user/perfil");
  };
  const handleMisDirecciones = () => {
    navigate("/user/misdirecciones");
  };
  const handleMisPedidos = () => {
    navigate("/user/mispedidos");
  };
  const handleMisReclamos = () => {
    navigate("/user/misreclamos");
  };

  const handleEditar = () => {
    navigate("/user/perfil/editar");
  };

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleFechaNac = (e) => {
    setFechaNac(e.target.value);
  };

  return (
    <>
      <Grid container justifyContent={"flex-start"} spacing={2} marginTop={0}>
        <Grid item xs={2}>
          <Drawer
            variant="permanent"
            sx={{
              width: "18%",
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: "18%", boxSizing: "border-box" },
            }}
          >
            <Toolbar variant="dense" />
            <Toolbar variant="dense" />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem sx={{ backgroundColor: "#ff0056" }} disablePadding>
                  <ListItemButton
                    sx={{ color: "#fff" }}
                    onClick={handleDatosPersonales}
                  >
                    <ListItemIcon sx={{ color: "#fff" }}>
                      <AccountBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Datos Personales"} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={handleMisDirecciones}>
                    <ListItemIcon>
                      <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Mis Direcciones"} />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={handleMisPedidos}>
                    <ListItemIcon>
                      <CreditCardIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Mis Pedidos"} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleMisReclamos}>
                    <ListItemIcon>
                      <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Mis Reclamos"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Grid>

        <Grid item xs={6}>
          <Grid
            container
            sx={{
              ml: "5%",
              borderRadius: 4,
              border: "2px solid #007aff",
              padding: 1,
              mt: 2,
            }}
          >
            <Grid item xs={12}>
              <Typography
                width={"75%"}
                variant="h3"
                component={"h2"}
                color={"black"}
              >
                Perfil
              </Typography>
            </Grid>
            <Grid marginLeft={2} mt={2} item xs={5} mb={3}>
              <TextField
                disabled={true}
                size="small"
                variant="filled"
                label="Nombre"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#fff", borderRadius: 2, width: "76%" }}
                name="nombre"
                value={name || ""}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid marginLeft={2} item xs={5} mb={3} mt={2}>
              <TextField
                disabled={true}
                size="small"
                variant="filled"
                label="Apellido"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#fff", borderRadius: 2, width: "76%" }}
                name="apellido"
                value={surname || ""}
                onChange={handleSurnameChange}
              />
            </Grid>
            <Grid marginLeft={2} item xs={5} mb={3}>
              <TextField
                disabled={true}
                size="small"
                variant="filled"
                label="Email"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "#fff", borderRadius: 2, width: "76%" }}
                name="email"
                value={mail || ""}
              />
            </Grid>
            <Grid marginLeft={2} item xs={5} mb={3}>
              <TextField
                disabled={true}
                size="small"
                variant="filled"
                label="Telefono"
                type="text"
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ backgroundColor: "white", borderRadius: 2, width: "76%" }}
                name="telefono"
                value={phone || ""}
                onChange={handlePhoneChange}
              />
            </Grid>
            <Grid marginLeft={2} item xs={10} mb={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  variant="filled"
                  disabled={true}
                  sx={{
                    backgroundColor: "#white",
                    borderRadius: 2,
                    width: "38%",
                  }}
                  size="small"
                  label="Fecha de Nacimiento"
                  value={nacimiento || ""}
                  onChange={handleFechaNac}
                  format="DD-MM-YYYY"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={10}></Grid>
            <Grid item xs={2}>
              <Button
                onClick={handleEditar}
                size="small"
                variant="text"
                sx={{
                  mr: 8,
                  textTransform: "capitalize",
                  fontSize: 14,
                  color: "white",
                  backgroundColor: "#007aff",
                  "&:hover": {
                    color: "#007aff",
                    borderBlockColor: "#007aff",
                    border: 1,
                  },
                }}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </>
  );
};
