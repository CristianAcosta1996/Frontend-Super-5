import { useModificarCompradorMutation } from "../../store/super5/super5Api";

export const useModificarComprador = () => {
    const [
        startModificarComprador,
    ] = useModificarCompradorMutation();

    const handleModificarComprador = async (
        nombre: string,
        apellido: string,
        telefono: string,
        fechaNacimiento: Date,
    ) => {
        const resp = await startModificarComprador({
            nombre,
            apellido,
            telefono,
            fechaNacimiento,
        });
        if (resp) alert(`DATOS CORRECTAMENTE MODIFICADOS`)
    };

    return { handleModificarComprador }
}

