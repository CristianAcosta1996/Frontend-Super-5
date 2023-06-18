import { useGetSucursalesQuery } from "../../store/super5/super5Api";

export const SelectorSucursales = (id: string) => {
    const { data: sucursales } = useGetSucursalesQuery();
    const miSucursal = sucursales?.find((sucursal) => {
        sucursal.id === id
        return sucursal.nombre
    })
    return miSucursal?.nombre
};