import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { ProductoCard } from "./ProductoCard";
import { useProductos } from "../hooks/useProductos";
import { CircularProgress, Container, Typography } from "@mui/material";
import { Categoria } from "../../interfaces/interfaces";

export const ProductosSlide = ({ categoria }: { categoria: Categoria }) => {

  const { isLoadingProductos, obtenerProductoPorCategoria } = useProductos();

  const prodPorCategoria = obtenerProductoPorCategoria(categoria.id)

  if (isLoadingProductos)
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

      <Typography
        variant="h5"
        component={"h2"}
        color={"black"}
      >
        {categoria.nombre}
      </Typography>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          450: {
            slidesPerView: 2,
          },
          680: {
            slidesPerView: 3,
          },
          880: {
            slidesPerView: 4,
          },
          1200: {
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
