import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";
import { useAddress } from "../hooks/useAddress";
import { useGetSucursalesQuery } from "../../store/super5/super5Api";
import { Button } from "@mui/material";

export default function AddressPage() {
    const [libraries] = useState(['places']);
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds", libraries });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const [selected, setSelected] = useState({ lat: -34.88361775757272, lng: -56.162513098582345 });
    const [direccion, setDireccion] = useState("");
    const [previous_place, setPrevious_place] = useState("");
    const [aclaraciones, setAclaraciones] = useState("");
    const [latLong, setLatLong] = useState({ lat: 0, lng: 0 })
    const { handleAddAddress } = useAddress();
    const [firstPin, setFirstPin] = useState(false)
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");

    const { data: sucursales } = useGetSucursalesQuery();

    const addMarker = ({ latLng }) => {
        setFirstPin(true)
        //tomo lat y lng del lugar del evento (click)
        const newMarker = { lat: latLng.lat(), lng: latLng.lng() };
        //paso la latitud y longitud de la marca en el mapa y se los mando a la api para obtener la direccion
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newMarker.lat},${newMarker.lng}&key=AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds`)
            .then(res => res.json())
            .then(data => {
                //guardamos en direccion la direccion seleccionada en el mapa
                setPrevious_place(direccion)
                setDireccion(data.results[0].formatted_address)
                setCiudad(data.results[0].address_components[2].long_name)
                setDepartamento(data.results[0].address_components[4].long_name)
                setLatLong(newMarker)
                setSelected(newMarker);
            })
            .catch(err => console.warn(err.message))
    };

    const saveDirection = () => {
        handleAddAddress(direccion, ciudad, departamento, latLong.lng.toString(), latLong.lat.toString(), aclaraciones)

    }

    return (
        <>
            <GoogleMap
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
                clickableIcons={false}
                // onCenterChanged={} PARA AGREGAR CARGA
                onClick={addMarker}
                zoom={12}
                center={selected}
                mapContainerStyle={{ maxWidth: 1400, minHeight: 400 }}>
                {selected && <MarkerF position={selected} visible={firstPin} />}
                {sucursales?.map((sucursal) => (
                    <MarkerF
                        key={sucursal.nombre}
                        position={{ lat: +sucursal.direccion.latitud, lng: +sucursal.direccion.longitud }}
                        icon="https://cdn.discordapp.com/attachments/1086451309487587421/1113673314997645333/super5markerWhite42.png"
                    />
                ))}
            </GoogleMap>
            <div >
                <PlacesAutocomplete setFirstPin={setFirstPin} setLatLong={setLatLong} setCiudad={setCiudad} setDepartamento={setDepartamento} previous_place={previous_place} setPrevious_place={setPrevious_place} setDireccion={setDireccion} direccion={direccion} setSelected={setSelected} />
            </div>
            <TextField
                variant="filled"
                label="Aclaraciones"
                type="text"
                sx={{ backgroundColor: "#fff", borderRadius: 2, minWidth: 800, ml: 2, boxShadow: 5 }}
                name="Aclaraciones"
                onChange={(e) => { setAclaraciones(e.target.value) }}
            />
            <div>
                <Button
                    onClick={saveDirection}
                    size="small"
                    variant="text"
                    sx={{
                        boxShadow: 2,
                        ml: 2,
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
                    Guardar Direccion
                </Button>
            </div>


        </>
    );
}

const PlacesAutocomplete = ({ setFirstPin, setLatLong, setCiudad, setDepartamento, setSelected, direccion, setDireccion, previous_place, setPrevious_place }) => {

    const {
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = () => {
        setFirstPin(true);
        const latLng = { lat: null, lng: null }
        if (status === "OK") {
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${data[0].place_id}&key=AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds`)
                .then(res => res.json())
                .then(data => {
                    //obtenemos la latitud y longitud de la direccion con id place_id y lo seteamos como selected para mostrar un markerF
                    latLng.lat = data.results[0].geometry.location.lat
                    latLng.lng = data.results[0].geometry.location.lng
                    setDireccion(data.results[0].formatted_address)
                    setCiudad(data.results[0].address_components[2].long_name)
                    setDepartamento(data.results[0].address_components[4].long_name)
                    setLatLong(latLng)
                    setSelected(latLng)
                })
                .catch(err => console.warn(err.message))

        }
        clearSuggestions();
    }

    const checkValue = (valor) => {
        //checkeamos que el valor actual no sea igual al nuevo, si no lo es seteamos el nuevo valor como value
        if (valor == value) return
        if (valor == previous_place) return
        if (valor == "") return
        setPrevious_place(direccion)
        setDireccion(valor)
        setValue(valor)
    }

    return (
        <Autocomplete
            disablePortal
            disableClearable
            onChange={handleSelect}
            id="combo-box-demo"
            //cargamos la lista de opciones con las sugerencias del hook usePlacesAutocomplete()
            options={data.map(({ place_id, description }) => {
                return { label: description, place_id }
            })}
            isOptionEqualToValue={(option, direccion) => option.description === direccion}
            sx={{ width: 800, ml: 2, boxShadow: 5 }}
            value={direccion}
            renderInput={(params) => {
                if (params.inputProps.value) {
                    checkValue(params.inputProps.value)
                }

                return <TextField {...params} label="Ej. Asuncion 1531, Montevideo" />
            }}
        />
    )
}

