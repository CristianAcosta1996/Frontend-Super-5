import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";

export default function AddressPage() {
    const [libraries] = useState(['places']);
    const { isLoaded } = useLoadScript({ googleMapsApiKey: "AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds", libraries });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const first_center = useMemo(() => ({ lat: -34.8947415062631, lng: -56.16628964887531 }), []);
    const [selected, setSelected] = useState({ lat: -34.8947415062631, lng: -56.16628964887531 });
    const [new_place, setNew_place] = useState("");
    const [previous_place, setPrevious_place] = useState("");
    const [valorInput, setValorInput] = useState("");
    const [aclaraciones, setAclaraciones] = useState("");
    const [latLong, setLatLong] = useState({ lat: 0, lng: 0 })
    const addMarker = ({ latLng }) => {
        //tomo lat y lng del lugar del evento (click)
        const newMarker = { lat: latLng.lat(), lng: latLng.lng() };
        setLatLong(newMarker)
        //actualizamos el marker
        setSelected(newMarker);
        //paso la latitud y longitud de la marca en el mapa y se los mando a la api para obtener la direccion
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${newMarker.lat},${newMarker.lng}&key=AIzaSyB8FiaESvpDDrcOkwW07BVr5Z-rdumVSds`)
            .then(res => res.json())
            .then(data => {
                //guardamos en new_place la direccion seleccionada en el mapa
                setPrevious_place(new_place)
                console.log(latLong)
                console.log(data.results[0].address)
                setNew_place(data.results[0].formatted_address)
                console.log("NEW PLACE:", new_place);
                setValorInput(data.results[0].formatted_address)
                console.log("VALOR INPUT: ", valorInput);
                console.log(data.results[0])
                console.log("CIUDAD: ", data.results[0].address_components[2].long_name)
                console.log("DEPARTAMENTO: ", data.results[0].address_components[4].long_name)
            })
            .catch(err => console.warn(err.message))
    };

    const saveDirection = () => {
        window.localStorage.setItem("direccion", new_place)
        window.localStorage.setItem("aclaraciones", aclaraciones)
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
                zoom={14}
                center={selected ? selected : first_center}
                mapContainerStyle={{ width: 800, height: 500 }}>
                {selected && <MarkerF position={selected} />}
            </GoogleMap>
            <div >
                <PlacesAutocomplete previous_place={previous_place} setPrevious_place={setPrevious_place} setNew_place={setNew_place} new_place={new_place} setSelected={setSelected} />
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

const PlacesAutocomplete = ({ setSelected, new_place, setNew_place, previous_place, setPrevious_place }) => {

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
        setPrevious_place(new_place)
        setNew_place(valor)
        setValue(valor)
    }

    return (
        <Autocomplete
            disablePortal
            disableClearable
            onInputChange={handleSelect}
            id="combo-box-demo"
            //cargamos la lista de opciones con las sugerencias del hook usePlacesAutocomplete()
            options={data.map(({ place_id, description }) => {
                return { label: description, place_id }
            })}
            isOptionEqualToValue={(option, new_place) => option.description === new_place}
            sx={{ width: 800 }}
            value={new_place}
            renderInput={(params) => {
                if (params.inputProps.value) {
                    checkValue(params.inputProps.value)
                }

                return <TextField {...params} label="Ej. Asuncion 1531, Montevideo" />
            }}
        />
    )
}

