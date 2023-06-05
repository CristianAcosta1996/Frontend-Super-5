import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { ProductoCard } from "./ProductoCard";
import { useProductos } from "../hooks/useProductos";
import { CircularProgress, Container } from "@mui/material";
import { Categoria } from "../../interfaces/interfaces";
import { useGetCategoriasQuery } from "../../store/super5/super5Api";

export const ProductosSlide = ({ categoria }: { categoria: Categoria }) => {

  const { isLoading, obtenerProductoPorCategoria } = useProductos();
  const prodPorCategoria = obtenerProductoPorCategoria(categoria.id)

  if (isLoading)
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  if (prodPorCategoria) {
    if (prodPorCategoria.length < 1) return <></>
  }

  return (
    <>

      <h2>{categoria.nombre}</h2>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          430: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          820: {
            slidesPerView: 5,
          },
          1000: {
            slidesPerView: 6,
          },
        }}
        style={{
          height: 400,

          paddingLeft: 35,
          paddingRight: 35,
          marginRight: 10,
        }}
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={6}
        onSlideChange={() => {
          /* console.log("slide change") */
        }}
        onSwiper={(swiper) => {
          /* console.log(swiper) */
        }}
      >
        {prodPorCategoria?.map((producto, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ProductoCard producto={producto} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>

  );
};
