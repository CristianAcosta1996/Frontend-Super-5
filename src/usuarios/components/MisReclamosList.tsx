import { Box, IconButton, Typography } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
} from "@mui/x-data-grid";
import { useGetReclamosQuery } from "../../store/super5/super5Api";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID del reclamo",
        width: 110,
    },
    {
        field: "estado",
        headerName: "Estado",
        width: 80,
    },
    {
        field: "comentario",
        headerName: "Comentario del cliente",
        width: 220,
    },
    {
        field: "comentarioSucursal",
        headerName: "Comentario de la sucursal",
        width: 220,
    },
    {
        field: "tipo",
        headerName: "Tipo",
        width: 80,

    },
    {
        field: "venta",
        headerName: "ID de la venta",
        width: 110,
        renderCell: (params: GridRenderCellParams) => {
            return <Typography >{params.row.venta.id}</Typography>;
        },
    },
];



export const MisReclamosList = () => {
    const { data: reclamos } = useGetReclamosQuery();

    return (
        <>
            <Box
                sx={{ height: "97vh", width: "820px" }}
                className="animate__animated animate__fadeIn"
            >
                <DataGrid columns={columns} rows={reclamos || []} autoPageSize />
            </Box>
        </>
    );
};

