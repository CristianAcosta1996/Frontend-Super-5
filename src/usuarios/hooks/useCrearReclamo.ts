import { useCrearReclamoMutation } from "../../store/super5/super5Api";

export const useCrearReclamo = () => {
    const [
        startCrearReclamo,
    ] = useCrearReclamoMutation();

    const handleCrearReclamo = async (
        id: number,
        tipo: "ATENCION" | "DEMORA" | "CALIDAD" | "PRECIO" | "OTRO",
        comentario: string,
    ) => {
        startCrearReclamo({
            tipo,
            estado: "CREADO",
            comentario: comentario,
            venta: {
                id
            },

        }).unwrap()
            .then((resp) => {
                console.log(resp);
            })
            .catch((error) => {
                alert(error.data);
            })

    };

    return { handleCrearReclamo }
}
