import { useEliminarDireccionMutation } from "../../store/super5/super5Api";

export const useEliminarDireccion = () => {
    const [
        startEliminarDireccion,
    ] = useEliminarDireccionMutation();

    const handleEliminarDireccion = async (

        direccion: string,
        ciudad: string,
        departamento: string,
        longitud: string,
        latitud: string,
        aclaracion: string,

    ) => {
        startEliminarDireccion({
            direccion,
            ciudad,
            departamento,
            longitud,
            latitud,
            aclaracion,
        }).unwrap()
            .then((resp) => {
                console.log(resp);
            })
            .catch((error) => {
                alert(error.data);
            })

    };

    return { handleEliminarDireccion }
}