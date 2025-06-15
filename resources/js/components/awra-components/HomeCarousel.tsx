import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Pagination, Navigation, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type HomeCarouselProps = {
  images?: string[]; // Puede ser opcional
};

/**
 * Carrusel publicitario de la home.
 * Recibe un array de imágenes y las muestra en un slider.
 */
export default function HomeCarousel({ images = [] }: HomeCarouselProps) {
  return (
    <div className="my-8">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop
        speed={900}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {(images || []).map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="w-full h-[500px] flex items-center justify-center bg-white overflow-hidden">
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}