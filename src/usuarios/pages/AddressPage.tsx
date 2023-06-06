import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";
import { useAddress } from "../hooks/useAddress";
import { useGetSucursalesQuery } from "../../store/super5/super5Api";

export default function AddressPage() {
    const [libraries] = useState(['places']);
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds", libraries });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const [selected, setSelected] = useState({ lat: -34.8947415062631, lng: -56.16628964887531 });
    const [direccion, setDireccion] = useState("");
    const [previous_place, setPrevious_place] = useState("");
    const [aclaraciones, setAclaraciones] = useState("");
    const [latLong, setLatLong] = useState({ lat: 0, lng: 0 })
    const { handleAddAddress } = useAddress();
    const [firstPin, setFirstPin] = useState(false)
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");

    const { data: sucursales } = useGetSucursalesQuery();

    const [sucursal1, setSucursal1] = useState({ lat: 0, lng: 0 })
    const [sucursal2, setSucursal2] = useState({ lat: 0, lng: 0 })
    const [sucursal3, setSucursal3] = useState({ lat: 0, lng: 0 })
    const [sucursal4, setSucursal4] = useState({ lat: 0, lng: 0 })
    const [sucursal1name, setSucursal1name] = useState("")
    const [sucursal2name, setSucursal2name] = useState("")
    const [sucursal3name, setSucursal3name] = useState("")
    const [sucursal4name, setSucursal4name] = useState("")

    useEffect(() => {
        if (sucursales) {
            setSucursal1({ lat: +sucursales[0].direccion.latitud, lng: +sucursales[0].direccion.longitud });
            setSucursal1name(sucursales[0].nombre)
            setSucursal2({ lat: +sucursales[1].direccion.latitud, lng: +sucursales[1].direccion.longitud });
            setSucursal2name(sucursales[1].nombre)
            setSucursal3({ lat: +sucursales[2].direccion.latitud, lng: +sucursales[2].direccion.longitud });
            setSucursal3name(sucursales[2].nombre)
            setSucursal4({ lat: +sucursales[3].direccion.latitud, lng: +sucursales[3].direccion.longitud });
            setSucursal4name(sucursales[3].nombre)
        }
    }, [sucursales]);


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
                zoom={13}
                center={selected}
                mapContainerStyle={{ width: 1400, height: 400 }}>
                {selected && <MarkerF position={selected} visible={firstPin} />}
                {<MarkerF position={sucursal1} label={sucursal1name} icon={"https://cdn.discordapp.com/attachments/1086451309487587421/1113673314997645333/super5markerWhite42.png"} />}
                {<MarkerF position={sucursal2} label={sucursal2name} icon={"https://cdn.discordapp.com/attachments/1086451309487587421/1113673314997645333/super5markerWhite42.png"} />}
                {<MarkerF position={sucursal3} label={sucursal3name} icon={"https://cdn.discordapp.com/attachments/1086451309487587421/1113673314997645333/super5markerWhite42.png"} />}
                {<MarkerF position={sucursal4} label={sucursal4name} icon={"https://cdn.discordapp.com/attachments/1086451309487587421/1113673314997645333/super5markerWhite42.png"} />}
            </GoogleMap>
            <div >
                <PlacesAutocomplete setLatLong={setLatLong} setCiudad={setCiudad} setDepartamento={setDepartamento} previous_place={previous_place} setPrevious_place={setPrevious_place} setDireccion={setDireccion} direccion={direccion} setSelected={setSelected} />
            </div>
            <TextField
                variant="filled"
                label="Aclaraciones"
                type="text"
                sx={{ backgroundColor: "#fff", borderRadius: 2, width: 800 }}
                name="Aclaraciones"
                onChange={(e) => { setAclaraciones(e.target.value) }}
            />
            <div>
                <button onClick={saveDirection}>
                    Guardar dirección
                </button>
            </div>


        </>
    );
}

const PlacesAutocomplete = ({ setLatLong, setCiudad, setDepartamento, setSelected, direccion, setDireccion, previous_place, setPrevious_place }) => {

    const {
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = () => {

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
            sx={{ width: 800 }}
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

