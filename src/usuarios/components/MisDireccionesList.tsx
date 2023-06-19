import {
    Box,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridValueGetterParams,
} from "@mui/x-data-grid";
import {
    useCancelarCompraMutation,
    useGetDireccionesQuery
} from "../../store/super5/super5Api";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { useEliminarDireccion } from "../hooks/useEliminarDireccion";
import { useState } from "react";
import { PopupMessage } from "../../components/PopupMessage";

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
        field: "modificar",
        headerName: "Modificar",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return <ReclamoButton params={params} />;
        },
    },
    {
        field: "eliminar",
        headerName: "Eliminar",
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return <EliminarDireccion params={params} />;
        },
    },
];

export const MisDireccionesList = () => {
    const { data: direcciones } = useGetDireccionesQuery();

    return (
        <>
            <Box
                sx={{ height: "78vh", width: "980px" }}
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
        </>

    )
}

const EliminarDireccion = ({ params }: { params: GridRenderCellParams }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const { handleEliminarDireccion } = useEliminarDireccion();
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
        <Box>
            <PopupMessage
                description="¿Está seguro de que desea eliminar la dirección?"
                title="Eliminar Dirección"
                handleClose={() => {
                    setShowPopup(false);
                }}
                open={showPopup}
                dialogContent={() => {
                    return <></>;
                }}
                actions={[
                    {
                        actionName: "Cancelar",
                        handleAction: () => {
                            setShowPopup(false);
                        },
                        buttonColor: "error",
                    },
                    {
                        actionName: "Confirmar",
                        handleAction: handleEliminar,
                        buttonColor: "success",
                    },
                ]}
            />
            <Tooltip
                title="Confirmar"
                onClick={() => {
                    setShowPopup(true);
                }}
            >
                <IconButton>
                    <Delete />
                </IconButton>
            </Tooltip>
        </Box>
    );
};