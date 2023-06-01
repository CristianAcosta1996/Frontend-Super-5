import { useAddAddressMutation } from "../../store/super5/super5Api";

export const useAddress = () => {
    const [
        startAddAddress,
    ] = useAddAddressMutation();

    const handleAddAddress = async (
        direccion: string,
        ciudad: string,
        departamento: string,
        longitud: string,
        latitud: string,
        aclaracion: string,
    ) => {
        const resp = await startAddAddress({
            direccion,
            ciudad,
            departamento,
            longitud,
            latitud,
            aclaracion
        });
        if (resp) alert(`${direccion} CORRECTAMENTE AGREGADO A MIS DIRECCIONES`)
    };

    return { handleAddAddress }
}

