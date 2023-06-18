import {
    Box,
    IconButton,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import {
    useGetDireccionesQuery
} from "../../store/super5/super5Api";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useEliminarDireccion } from "../hooks/useEliminarDireccion";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "id",
        width: 70,
    },
    {
        field: "direccion",
        headerName: "Direccion",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.direccion}`;
        },
    },
    {
        field: "ciudad",
        headerName: "Ciudad",
        width: 120,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.ciudad}`;
        },
    },
    {
        field: "departamento",
        headerName: "Departamento",
        width: 222,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.departamento}`;
        },
    },
    {
        field: "aclaracion",
        headerName: "Aclaracion",
        width: 200,
        type: "string",
        valueGetter: (params: GridValueGetterParams) => {
            return `${params.row.aclaracion}`;
        },
    },
    {
        field: "actions",
        headerName: "Modificar",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return <ReclamoButton params={params} />;
        },
    },

];

export const MisDireccionesList = () => {
    const { data: direcciones } = useGetDireccionesQuery();

    return (
        <>
            <Box
                sx={{ height: "97vh" }}
                className="animate__animated animate__fadeIn"
            >
                <DataGrid
                    columns={columns}
                    rows={direcciones || []}
                    autoPageSize
                />
            </Box>
        </>
    );
};

const ReclamoButton = ({ params }: { params: GridRenderCellParams }) => {
    const navigate = useNavigate();
    const { handleEliminarDireccion } = useEliminarDireccion();
    const handleModificar = () => {
        const direccionID = params.row.id;
        const direccionLat = params.row.latitud;
        const direccionLng = params.row.longitud;
        const direccionFull = params.row.direccion;
        const direccionAclaracion = params.row.aclaracion;
        const direccionCiudad = params.row.ciudad;
        const direccionDepartamento = params.row.departamento;
        navigate("/user/misdirecciones/modificar", {
            state: { direccionID, direccionFull, direccionLat, direccionLng, direccionAclaracion, direccionCiudad, direccionDepartamento },
        });
    }

    const handleEliminar = () => {

        handleEliminarDireccion(
            params.row.id,
            params.row.direccion,
            params.row.ciudad,
            params.row.departamento,
            params.row.longitud,
            params.row.latitud,
            params.row.aclaracion,
            true);
    }
    return (
        <>
            <IconButton title="Modificar" onClick={handleModificar}>
                <Edit />
            </IconButton>
            <IconButton title="Eliminar" onClick={handleEliminar}>
                <Delete />
            </IconButton>
        </>

    )
}