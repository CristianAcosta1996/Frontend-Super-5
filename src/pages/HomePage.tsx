import React from "react";
import {
  Box,
  Grid,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import slide1 from "../assets/1.svg";
import slide2 from "../assets/2.svg";
import slide3 from "../assets/3.svg";
import slide4 from "../assets/4.svg";
import slide5 from "../assets/5.svg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { ProductosSlide } from "../productos/components/ProductosSlide";
import { useGetCategoriasQuery } from "../store/super5/super5Api";
import { Footer } from "../usuarios/components/Footer";

export const HomePage = () => {
  const { data: categorias } = useGetCategoriasQuery();
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={12} mb={2}>
          <Slider imagenes={imagenes} />
        </Grid>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12} mt={1} sm={10}>
          {categorias?.map((categoria) => {
            if (+categoria.id === 6) {
              return (
                <React.Fragment key={categoria.id}>
                  <Grid
                    container
                    bgcolor="#03507D"
                    justifyContent="center"
                    mb={1}
                  >
                    <img src="https://i.ibb.co/5n2KKht/oferta-Limpieza.png" />
                  </Grid>
                  <ProductosSlide key={categoria.id} categoria={categoria} />
                </React.Fragment>
              );
            }
            return <ProductosSlide key={categoria.id} categoria={categoria} />;
          })}
        </Grid>
        <Grid item xs={0} sm={1} />
      </Grid>
      <Footer />
    </Box>
  );
};
const imagenes: string[] = [slide1, slide2, slide3, slide4, slide5];

interface SliderProps {
  imagenes: string[];
}
const Slider = ({ imagenes }: SliderProps) => {
  return (
    <Swiper
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      watchOverflow={true}
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => {}}
      onSlideChange={() => {}}
    >
      {imagenes.map((imagen) => (
        <SwiperSlide key={imagen}>
          <Box
            sx={{
              width: "100%",
              height: 400,
              /* Borrar el height si no arreglamos las imagenes del carrousel */
            }}
          >
            <img
              src={`${imagen}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit:
                  "cover" /* objectFit: "fill" cambiarlo en caso de no arreglar las imagenes*/,
              }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
