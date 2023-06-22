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
import { CircularProgress } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);

export const EstadisticasPage = () => {
  const { data: ventas, isLoading } = useGetComprasQuery();

  const [dataBar, setDataBar] = useState<any>();

  useEffect(() => {
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
  }, [ventas]);
  if (isLoading) return <CircularProgress />;
  return (
    <div>
      <h1>EstadisticasPage</h1>
      <BarChart data={dataBar} />
    </div>
  );
};

const BarChart = ({ data }) => {
  return <Bar data={data} />;
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
