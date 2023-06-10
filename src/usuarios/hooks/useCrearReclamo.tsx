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
        const resp = await startCrearReclamo({
            tipo,
            estado: "CREADO",
            comentario: comentario,
            venta: {
                id
            },

        });
        if (resp) alert(`RECLAMO EFECTUADO`)
    };

    return { handleCrearReclamo }
}
