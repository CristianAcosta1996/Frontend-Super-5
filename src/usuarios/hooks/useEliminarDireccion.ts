import { useEliminarDireccionMutation } from "../../store/super5/super5Api";

export const useEliminarDireccion = () => {
  const [startEliminarDireccion] = useEliminarDireccionMutation();

  const handleEliminarDireccion = async (
    id: string,
    direccion: string,
    ciudad: string,
    departamento: string,
    longitud: string,
    latitud: string,
    aclaracion: string,
    eliminado: boolean
  ) => {
    startEliminarDireccion({
      id,
      direccion,
      ciudad,
      departamento,
      longitud,
      latitud,
      aclaracion,
      eliminado,
    })
      .unwrap()
      .then((resp) => {})
      .catch((error) => {
        alert(error.data);
      });
  };

  return { handleEliminarDireccion };
};
