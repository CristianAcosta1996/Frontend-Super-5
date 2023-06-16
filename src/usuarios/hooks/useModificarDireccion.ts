import { useModificarDireccionMutation } from "../../store/super5/super5Api";

export const useModificarDireccion = () => {
    const [
        startModificarDireccion,
    ] = useModificarDireccionMutation();

    const handleModificarDireccion = async (
        id: string,
        direccion: string,
        ciudad: string,
        departamento: string,
        longitud: string,
        latitud: string,
        aclaracion: string
    ) => {
        startModificarDireccion({
            id,
            direccion,
            ciudad,
            departamento,
            longitud,
            latitud,
            aclaracion

        }).unwrap()
            .then((resp) => {
                alert("Modificacion exitosa");
            })
            .catch((error) => {
                alert(error.data);
            })
    };

    return { handleModificarDireccion }
}

