import { Box } from "@mui/material";
import { Super5Appbar } from "../components/Super5Appbar";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
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

export const HomePage = () => {
  return (
    <>
      <Box>
        <Super5Appbar />
        <Box>
          <Slider imagenes={imagenes} />
        </Box>
      </Box>
    </>
  );
};
const imagenes: string[] = [slide1, slide2, slide3, slide4, slide5];

interface SliderProps {
  imagenes: string[];
}
const Slider = ({ imagenes }: SliderProps) => {
  return (
    <Swiper
      height={200}
      watchOverflow={true}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {imagenes.map((imagen) => (
        <SwiperSlide key={imagen}>
          <Box
            sx={{
              width: "100%",
              height: 350,
              /* backgroundImage: `url("${imagen}")`,
              backgroundPosition: "50% 30%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "fill", */
              background: "#333",
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
