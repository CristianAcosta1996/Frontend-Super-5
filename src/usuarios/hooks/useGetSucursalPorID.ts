export const SelectorSucursales = (id: string, sucursalesData: any) => {
    const miSucursal = sucursalesData?.find((sucursal: any) => {
        return sucursal.id === id;
    });

    return miSucursal?.nombre;
};