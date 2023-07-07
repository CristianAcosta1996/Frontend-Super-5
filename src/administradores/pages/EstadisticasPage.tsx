import { Bar, Line } from "react-chartjs-2";
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
  const [top5Buyers, setTop5Buyers] = useState<any>();
  const [ventasPorSucursal, setVentasPorSucursal] = useState<any>();
  const [tipoEstadistica, setTipoEstadistica] = useState<
    "Top10" | "VentasEstado" | "Top5Compradores" | "VentasPorSucursal"
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

  const [dataLineChart, setDataLineChart] = useState<any>({
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
  /* 
  
  ----------------------------------------
  
  */

  useEffect(() => {
    if (!ventas || tipoEstadistica !== "Top5Compradores") return;
    try {
      const buyersTop5 = getTop5Buyers(ventas);
      setTop5Buyers(buyersTop5);
      /* if (!top10Products) return; */
    } catch (err) {
      console.log(err);
    }
  }, [ventas, tipoEstadistica]);

  useEffect(() => {
    if (tipoEstadistica !== "Top5Compradores") return;
    setDataBar({
      labels: Object.keys(top5Buyers),
      datasets: [
        {
          label: "Top 5 compradores",
          data: Object.values(top5Buyers),
        },
      ],
    });
  }, [top5Buyers]);

  const getTop10Products = (data: any[] | undefined) => {
    const productData: {
      [key: string]: { cantidad: number; producto: string };
    } = {};
    if (!data) return;
    data.forEach((order: any) => {
      order.carrito.forEach((item: any) => {
        const { producto_id, cantidad, producto } = item;
        if (productData[producto_id]) {
          productData[producto_id].cantidad += cantidad;
        } else {
          productData[producto_id] = { cantidad, producto };
        }
      });
    });
    const topProducts = Object.entries(productData)
      .sort(
        ([, { cantidad: cantidadA }], [, { cantidad: cantidadB }]) =>
          cantidadB - cantidadA
      )
      .slice(0, 10)
      .reduce((obj, [producto_id, { cantidad, producto }]) => {
        obj[producto] = cantidad;
        return obj;
      }, {});

    return topProducts;
  };

  const getTop5Buyers = (data) => {
    const buyerData: {
      [comprador_id: string]: { count: number; nombreComprador: string };
    } = {};
    if (!data) return [];

    data.forEach((order) => {
      const { comprador_id, nombreComprador } = order;

      if (buyerData[comprador_id]) {
        buyerData[comprador_id].count += 1;
      } else {
        buyerData[comprador_id] = {
          count: 1,
          nombreComprador,
        };
      }
    });

    const topBuyers = Object.entries(buyerData)
      .sort(([, { count: countA }], [, { count: countB }]) => countB - countA)
      .slice(0, 5)
      .reduce((obj, [comprador_id, { count, nombreComprador }]) => {
        obj[nombreComprador] = count;
        return obj;
      }, {});

    return topBuyers;
  };
  /* 
  ----------------------------------------------
  */

  const countSalesByMonth = (sales: any[]) => {
    const salesByMonth: { [sucursalID: number]: { [month: string]: number } } =
      {};

    sales.forEach((sale) => {
      const sucursalID = sale.sucursal_id;
      const month = new Date(sale.fechaCompra).toLocaleString("default", {
        month: "long",
      });

      if (salesByMonth[sucursalID]) {
        if (salesByMonth[sucursalID][month]) {
          salesByMonth[sucursalID][month]++;
        } else {
          salesByMonth[sucursalID][month] = 1;
        }
      } else {
        salesByMonth[sucursalID] = {
          [month]: 1,
        };
      }
    });

    return salesByMonth;
  };

  useEffect(() => {
    if (!ventas || tipoEstadistica !== "VentasPorSucursal") return;
    try {
      const ventasSucursal = countSalesByMonth(ventas);
      setVentasPorSucursal(ventasSucursal);
    } catch (err) {
      console.log(err);
    }
  }, [ventas, tipoEstadistica]);

  useEffect(() => {
    if (tipoEstadistica !== "VentasPorSucursal") return;

    const labels = Object.keys(ventasPorSucursal).reduce(
      (allLabels, sucursalID) => {
        const sucursalData = ventasPorSucursal[sucursalID];
        const months = Object.keys(sucursalData);
        return Array.from(new Set([...allLabels, ...months]));
      },
      [] as string[]
    );

    const datasets = Object.entries(ventasPorSucursal).map(
      ([sucursalID, sucursalData], index) => {
        const data = labels.map((month) => sucursalData![month] || 0).reverse();
        console.log(data);

        return {
          label: `Sucursal ${sucursalID}`,
          data,
          fill: false,
          borderColor: `rgba(${index * 50}, ${index * 100}, ${index * 150}, 1)`,
        };
      }
    );

    console.log("datasets", datasets);
    console.log("labels", labels);

    setDataLineChart({
      labels: labels.reverse(),
      datasets: datasets,
    });
  }, [ventasPorSucursal]);

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
            newTipoEstadistica:
              | "Top10"
              | "VentasEstado"
              | "Top5Compradores"
              | "VentasPorSucursal"
          ) => {
            if (newTipoEstadistica === null) return;
            setTipoEstadistica(newTipoEstadistica);
          }}
        >
          <ToggleButton value="Top5Compradores" onClick={() => {}}>
            Top 5 compradores
          </ToggleButton>
          <ToggleButton value="VentasPorSucursal" onClick={() => {}}>
            Ventas por sucursal
          </ToggleButton>
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
          {tipoEstadistica === "VentasPorSucursal" ? (
            <Line data={dataLineChart} />
          ) : (
            <BarChart data={dataBar} />
          )}
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
