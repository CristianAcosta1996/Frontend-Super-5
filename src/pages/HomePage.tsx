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
        <Grid item xs={12}>
          <img src="data:image/png;base64,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" />
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
      onSwiper={(swiper) => { }}
      onSlideChange={() => { }}
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
