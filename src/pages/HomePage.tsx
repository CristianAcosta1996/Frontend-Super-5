import { Box, Grid } from "@mui/material";
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

export const HomePage = () => {
  return (
    <Box>
      <Grid container paddingBottom={2}>
        <Grid item xs={12}>
          <Slider imagenes={imagenes} />
        </Grid>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12} mt={1} sm={10}>
          <ProductosSlide />
        </Grid>
        <Grid item xs={0} sm={1} />
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
      onSwiper={(swiper) => {
        /* console.log(swiper) */
      }}
      onSlideChange={() => {
        /* console.log("slide change") */
      }}
    >
      {imagenes.map((imagen) => (
        <SwiperSlide key={imagen}>
          <Box
            sx={{
              width: "100%",
              /* height: 350, */
              /* background: "#333", */
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
