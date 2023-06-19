import { Clear, MapOutlined } from "@mui/icons-material";
import {
  Grid,
  TextField,
  Typography,
  styled,
  SxProps,
  Theme,
  GridSize,
  Button,
  Dialog,
  CircularProgress,
  Container,
  DialogContent,
  Box,
  Autocomplete,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useState, useEffect, ChangeEventHandler } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import { useCrearSucursalMutation } from "../../store/super5/super5Api";
const googleMapApi = "https://maps.googleapis.com/maps/api/geocode/json";
const googleMapKey = "AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds";

export const CrearSucursalPage = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const [showSnackbar, setShowSnackbar] = useState<{
    show: boolean;
    isError: boolean;
    message: string;
  } | null>(null);

  const [nombre, setNombre] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [ciudad, setCiudad] = useState<string>("");
  const [departamento, setDepartamento] = useState<string>("");
  const [longitud, setLongitud] = useState<number>();
  const [latitud, setLatitud] = useState<number>();
  const [aclaracion, setAclaracion] = useState<string>("");
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [libraries] = useState<
    ("places" | "drawing" | "geometry" | "localContext" | "visualization")[]
  >(["places"]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds",
    libraries,
  });

  const [startCrearSucursal, { isLoading }] = useCrearSucursalMutation();

  const handleOnDireccionSelected = (coordenadas, formatted_address) => {
    setFormattedAddress(formatted_address);
    const direccionFragmentada = formatted_address.split(",").slice(0, -1);
    const departamentoMap = direccionFragmentada.slice(-1)[0];
    const ciudadMap = direccionFragmentada.slice(-2, -1)[0];
    const calleMap = direccionFragmentada.slice(0, -2).join(",");

    setDepartamento(departamentoMap);
    setCiudad(ciudadMap);
    setDireccion(calleMap);
    setLongitud(coordenadas.lng);
    setLatitud(coordenadas.lat);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (
      !nombre ||
      !direccion ||
      !ciudad ||
      !departamento ||
      !longitud ||
      !latitud
    )
      return;
    if (isNaN(latitud) || isNaN(longitud)) {
      alert("La longitud y la latitud deben ser numberos");
      return;
    }
    startCrearSucursal({
      direccion: {
        ciudad,
        departamento,
        direccion,
        latitud: latitud + "",
        longitud: longitud + "",
      },
      nombre,
    })
      .unwrap()
      .then((resp) => {
        console.log(resp);
        setShowSnackbar({
          isError: false,
          message: "Sucursal creada!",
          show: true,
        });
      })
      .catch((err) => {
        console.error(err);
        setShowSnackbar({
          isError: true,
          message: "Algo salio mal al crear la sucursal",
          show: true,
        });
      });
  };
  if (!isLoaded)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  return (
    <form onSubmit={handleOnSubmit}>
      <Snackbar
        open={showSnackbar?.show || undefined}
        autoHideDuration={2000}
        onClose={() => {
          setShowSnackbar((prev) => ({
            isError: prev?.isError || false,
            message: prev?.message || "",
            show: false,
          }));
        }}
      >
        <Alert
          severity={showSnackbar?.isError ? "error" : "success"}
          variant="filled"
        >
          {showSnackbar?.message}
        </Alert>
      </Snackbar>
      <Grid
        className="animate__animated animate__fadeIn animate__faster"
        container
        sx={{
          minHeight: "98vh",
          maxWidth: 800,
          bgcolor: "#333",
          px: 2,
          py: 2,
          color: "#fff",
          margin: "0 auto",
          borderRadius: 1,
        }}
        flexDirection="column"
      >
        <Grid item xs={12}>
          <Typography variant="h5" component="h5">
            Crear sucursal
          </Typography>
          <hr />
        </Grid>
        <Grid
          container
          flex={1}
          alignItems="center"
          alignContent="center"
          justifyContent="center"
        >
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={10} my={1}>
              <Typography>Nombre:</Typography>
            </Grid>
            <TextFieldGridItem
              label="Nombre"
              sm={10}
              value={nombre}
              handleOnChange={(event) => {
                setNombre(event.target.value);
              }}
            />
          </Grid>
          <Grid container gap={1} justifyContent="center">
            <Grid item xs={12} sm={10} my={1}>
              <Typography>Direccion:</Typography>
            </Grid>
            {/*  <TextFieldGridItem
              label="Direccion"
              value={direccion}
              handleOnChange={(event) => {
                setDireccion(event.target.value);
              }}
            /> */}
            <Grid item xs={12} sm={5} my={1}>
              <GoogleAutocomplete
                handlePlaceSelect={handleOnDireccionSelected}
                defaultValue={formattedAddress}
              />
            </Grid>
            <TextFieldGridItem
              label="Ciudad"
              value={ciudad}
              handleOnChange={(event) => {
                setCiudad(event.target.value);
              }}
            />
            <TextFieldGridItem
              label="Departamento"
              value={departamento}
              handleOnChange={(event) => {
                setDepartamento(event.target.value);
              }}
            />
            <TextFieldGridItem
              label="Longitud"
              value={longitud}
              handleOnChange={(event) => {
                setLongitud(+event.target.value);
              }}
            />
            <TextFieldGridItem
              label="Latitud"
              value={latitud}
              handleOnChange={(event) => {
                setLatitud(+event.target.value);
              }}
            />
            <TextFieldGridItem
              label="Aclaracion"
              value={aclaracion}
              handleOnChange={(event) => {
                setAclaracion(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          gap={1}
          pr={1}
        >
          <Button sx={{ color: "#fff" }}>Cancelar</Button>
          <Button sx={{ color: "#fff" }} type="submit">
            Crear
          </Button>
          <Tooltip title="Seleccionar direccion">
            <IconButton
              size="small"
              sx={{
                border: "1px solid #fff",
                backgroundImage:
                  "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
                "&: hover": {
                  backgroundImage:
                    "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
                },
              }}
              onClick={() => {
                setShowDialog(true);
              }}
            >
              <MapOutlined sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
        </Grid>
        <PopupMap
          open={showDialog}
          handleOnSelected={handleOnDireccionSelected}
          handleOnClose={() => {
            setShowDialog(false);
          }}
        />
      </Grid>
    </form>
  );
};

interface TextFieldGridItemProps {
  label: string;
  sx?: SxProps<Theme> | undefined;
  sm?: boolean | GridSize | undefined;
  value: string | number | undefined;
  handleOnChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
}

const TextFieldGridItem = ({
  label,
  sx,
  sm = 5,
  value,
  handleOnChange,
}: TextFieldGridItemProps) => (
  <Grid item xs={12} sm={sm} my={1} sx={sx}>
    <CustomTextField
      fullWidth
      label={label}
      variant="filled"
      size="small"
      value={value || ""}
      onChange={handleOnChange}
    />
  </Grid>
);

const CustomTextField = styled(TextField)(() => ({
  "& .MuiFilledInput-root": {
    backgroundColor: "#fff !important",
  },
}));

type PopupMapProps = {
  handleOnSelected: (
    coordenadas: Coordenadas,
    formatted_address: string
  ) => void;
  open: boolean;
  handleOnClose: () => void;
};
const PopupMap = ({
  handleOnSelected,
  open = false,
  handleOnClose,
}: PopupMapProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: { backgroundColor: "transparent", boxShadow: "none" },
      }}
    >
      <DialogContent
        sx={{
          position: "relative",
        }}
      >
        <IconButton
          onClick={handleOnClose}
          sx={{
            width: 25,
            height: 25,
            position: "absolute",
            zIndex: 100000,
            top: 0,
            right: 0,
            border: "1px solid #fff",
            backgroundImage:
              "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
            "&: hover": {
              backgroundImage:
                "linear-gradient(90deg, rgba(89,41,57,1) 0%, rgba(255,0,86,1) 100%);",
            },
            transform: "translate(-50%,30%);",
          }}
        >
          <Clear sx={{ color: "#fff" }} />
        </IconButton>
        <Map
          handleOnSelected={handleOnSelected}
          handleOnClose={handleOnClose}
        />
      </DialogContent>
    </Dialog>
  );
};

type Coordenadas = {
  lat: number;
  lng: number;
};

const Map = ({
  handleOnSelected,
  handleOnClose,
}: {
  handleOnSelected: (
    coordenadas: Coordenadas,
    formatted_address: string
  ) => void;
  handleOnClose: () => void;
}) => {
  const [coord, setCoord] = useState<Coordenadas>();
  const [center] = useState({
    lat: -34.8947415062631,
    lng: -56.16628964887531,
  });

  const agregarMarcador = ({ latLng }: google.maps.MapMouseEvent) => {
    const lat = latLng?.lat();
    const lng = latLng?.lng();
    setCoord({ lat: lat || -34.8947415062631, lng: lng || -56.16628964887531 });

    fetch(`${googleMapApi}?latlng=${lat},${lng}&key=${googleMapKey}`)
      .then((resp) => resp.json())
      .then(({ results }) => {
        const { formatted_address: direccionFormateada } = results[0];

        handleOnSelected(
          {
            lat: lat || -34.8947415062631,
            lng: lng || -56.16628964887531,
          },
          direccionFormateada
        );
        handleOnClose();
      })
      .catch(console.error);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <GoogleMap
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onClick={agregarMarcador}
        clickableIcons={false}
        zoom={13}
        center={center}
        mapContainerStyle={{ width: "100%", height: 450 }}
      >
        {coord && <Marker position={coord} />}
      </GoogleMap>
    </Box>
  );
};

const GoogleAutocomplete = ({
  handlePlaceSelect,
  defaultValue,
}: {
  handlePlaceSelect: (
    coordenadas: Coordenadas,
    formatted_address: string
  ) => void;
  defaultValue: string;
}) => {
  const [placeSelected, setPlaceSelected] = useState<{
    place_id: string;
    description: string;
  } | null>();

  const {
    value,
    setValue,
    ready,
    suggestions: { data: results, loading },
  } = usePlacesAutocomplete();

  useEffect(() => {
    if (!placeSelected) return;
    const getCoord = async () => {
      const resp = await fetch(
        `${googleMapApi}?place_id=${placeSelected.place_id}&key=${googleMapKey}&libraries=places`
      );
      const {
        results: [result],
      } = await resp.json();

      const {
        geometry: { location },
        formatted_address,
      } = result;

      handlePlaceSelect(location, formatted_address);
    };
    getCoord();
  }, [placeSelected]);

  return (
    <Autocomplete
      disabled={!ready}
      options={results.map((result) => {
        return {
          place_id: result.place_id,
          description: result.description,
        };
      })}
      value={placeSelected || null}
      onChange={(_, newValue) => {
        setPlaceSelected(newValue);
      }}
      isOptionEqualToValue={(option, value) =>
        option.description === value.description
      }
      noOptionsText="No hay opciones"
      getOptionLabel={({ description }) => description}
      loading={loading}
      inputValue={value || defaultValue || ""}
      onInputChange={(_, newInput) => {
        setValue(newInput || "");
      }}
      renderInput={(params) => {
        return (
          <CustomTextField
            {...params}
            size="small"
            label="Direccion"
            variant="filled"
          />
        );
      }}
    />
  );
};
