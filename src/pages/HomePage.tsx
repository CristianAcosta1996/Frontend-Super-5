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

export const HomePage = () => {
  const { data: categorias } = useGetCategoriasQuery();
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Slider imagenes={imagenes} />
        </Grid>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12} mt={1} sm={10}>
          {categorias?.map((categoria) => (
            <ProductosSlide key={categoria.id} categoria={categoria} />
          ))}
        </Grid>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
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
            }}
          >
            <img
              src={`${imagen}`}
              style={{ width: "100%", height: "100%", objectFit: "fill" }}
            />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        display: "flex",
        px: 1,
        py: 2,
        justifyContent: "space-between",
      }}
      bgcolor="#1976D2"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <Link color="inherit">Nosotros</Link>
        <Link color="inherit">Sucursales</Link>
        <Link color="inherit">Terminos y condiciones</Link>
      </Box>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",

            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <Link color="inherit">Facebook</Link>
          <Link color="inherit">Instagram</Link>
        </Box>
        <Typography color="inherit">
          &copy; Todos los derechos reservados por Super5
        </Typography>
      </Box>
    </Box>
  );
};
