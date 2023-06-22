import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useGetComprasQuery } from "../../store/super5/super5Api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js/auto";
import {
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

export const EstadisticasPage = () => {
  const { data: ventas, isLoading } = useGetComprasQuery();
  const [top10Products, setTop10Products] = useState<any>();
  const [tipoEstadistica, setTipoEstadistica] = useState<
    "Top10" | "VentasEstado"
  >("VentasEstado");

  const [dataBar, setDataBar] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (!ventas || tipoEstadistica !== "VentasEstado") return;
    setDataBar({
      labels: [...new Set(ventas?.map((venta) => venta.estado))],
      datasets: [
        {
          label: "Cantidad de ventas por estado",
          data: cantidadPorEstado(
            [...new Set(ventas?.map((venta) => venta.estado))],
            ventas!
          ),
        },
      ],
    });
  }, [ventas, tipoEstadistica]);

  useEffect(() => {
    if (!ventas || tipoEstadistica !== "Top10") return;
    try {
      const productsTop10 = getTop10Products(ventas);
      setTop10Products(productsTop10);
      /* if (!top10Products) return; */
    } catch (err) {
      console.log(err);
    }
  }, [ventas, tipoEstadistica]);

  useEffect(() => {
    if (tipoEstadistica !== "Top10") return;
    setDataBar({
      labels: Object.keys(top10Products),
      datasets: [
        {
          label: "Top 10 productos mas vendidos",
          data: Object.values(top10Products),
        },
      ],
    });
  }, [top10Products]);

  const getTop10Products = (data: any[] | undefined) => {
    const productData: { [key: string]: number } = {};
    if (!data) return;
    data.forEach((order: any) => {
      order.carrito.forEach((item: any) => {
        const { producto_id, cantidad } = item;
        if (productData[producto_id]) {
          productData[producto_id] += cantidad;
        } else {
          productData[producto_id] = cantidad;
        }
      });
    });
    const topProducts = Object.entries(productData)
      .sort(([, cantidadA], [, cantidadB]) => cantidadB - cantidadA)
      .slice(0, 10)
      .reduce((obj, [producto_id, cantidad]) => {
        obj[producto_id] = cantidad;
        return obj;
      }, {});

    return topProducts;
  };

  if (isLoading) return <CircularProgress />;
  return (
    <>
      <Box sx={{ alignSelf: "stretch" }}>
        <Typography variant="h3" component="h3">
          Estadisticas
        </Typography>
        <hr />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ToggleButtonGroup
          value={tipoEstadistica}
          color="primary"
          exclusive
          size="small"
          onChange={(
            _: React.MouseEvent<HTMLElement>,
            newTipoEstadistica: "Top10" | "VentasEstado"
          ) => {
            if (newTipoEstadistica === null) return;
            setTipoEstadistica(newTipoEstadistica);
          }}
        >
          <ToggleButton
            value="Top10"
            onClick={() => {
              /*  setTipoEstadistica("Top10"); */
            }}
          >
            Top 10 productos mas vendidos
          </ToggleButton>
          <ToggleButton
            value="VentasEstado"
            onClick={() => {
              /*      setTipoEstadistica("VentasEstado"); */
            }}
          >
            Cantidad de ventas por estado
          </ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ py: 2 }}>
          <BarChart data={dataBar} />
        </Box>
      </Box>
    </>
  );
};

const BarChart = ({ data }) => {
  return (
    <Bar data={data} style={{ width: "100%", minWidth: 400, minHeight: 400 }} />
  );
};

const cantidadPorEstado = <T, V extends { estado: string }>(
  estados: T[],
  data: V[]
): number[] => {
  const cantidades = estados.map(
    (estado) => data.filter((item) => item.estado === estado).length
  );
  return cantidades;
};
