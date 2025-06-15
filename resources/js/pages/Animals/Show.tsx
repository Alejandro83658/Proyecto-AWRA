import React from 'react';
import { usePage } from '@inertiajs/react';
import AwraLayout from '../../layouts/awra-main-layout';
import type { Animal } from '../../types';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, Keyboard, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/effect-fade';

const getImageUrl = (path: string) => {
  if (!path) return '/default.jpg';
  if (path.startsWith('http')) return path;
  if (path.startsWith('storage/')) return `/${path}`;
  if (path.startsWith('animals/')) return `/storage/${path}`;
  return `/${path}`;
};

const Show = () => {
  const { animal } = usePage<{ animal: Animal }>().props;
  const images = animal.images?.length
    ? animal.images.map(img => getImageUrl(img.path))
    : ['/default.jpg'];
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null);

  // Estado para la imagen ampliada
  const [zoomImg, setZoomImg] = React.useState<string | null>(null);

  return (
    <AwraLayout title={animal.name} subtitle="Detalles del Animal">
      {/* Modal de imagen ampliada */}
      {zoomImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setZoomImg(null)}
        >
          <img
            src={zoomImg}
            alt="Imagen ampliada"
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            className="absolute top-6 right-8 text-white text-4xl font-bold"
            onClick={() => setZoomImg(null)}
            title="Cerrar"
          >
            &times;
          </button>
        </div>
      )}

      <div className="container mx-auto p-4 flex flex-col md:flex-row md:space-x-8">
        {/* Carrusel principal y corazón superpuesto */}
        <div className="w-full md:w-2/3 order-1 md:order-2 flex flex-row items-start space-x-4">
          <div className="flex-1 flex flex-col items-center">
            <Swiper
              style={{ width: '100%', maxWidth: '28rem', borderRadius: '0.5rem' }}
              spaceBetween={10}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              keyboard={{ enabled: true }}
              effect="fade"
              modules={[Navigation, Pagination, Thumbs, Keyboard, EffectFade]}
              className="mb-4"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative">
                    <img
                      src={img}
                      alt={`Imagen ${idx + 1}`}
                      className="w-full h-96 md:h-[32rem] object-cover rounded-lg shadow-md cursor-zoom-in"
                      onClick={() => setZoomImg(img)}
                    />
                    {/* Botón de favorito solo en la imagen principal */}
                    {/* {idx === 0 && (
                      <button
                        className="absolute top-2 right-2 bg-white/80 rounded-full p-2 shadow hover:bg-red-100 transition"
                        title="Añadir a favoritos"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 text-red-600" viewBox="0 0 20 20">
                          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                        </svg>
                      </button>
                    )} */}
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev !text-red-900 !bg-transparent !rounded-none !p-0 !shadow-none !border-none hover:!bg-transparent hover:!text-red-700 transition" />
              <div className="swiper-button-next !text-red-900 !bg-transparent !rounded-none !p-0 !shadow-none !border-none hover:!bg-transparent hover:!text-red-700 transition" />
            </Swiper>
            {/* Miniaturas */}
            {images.length > 1 && (
              <Swiper
                onSwiper={setThumbsSwiper}
                style={{ width: '100%', maxWidth: '28rem', borderRadius: '0.5rem' }}
                spaceBetween={10}
                slidesPerView={Math.min(images.length, 6)}
                watchSlidesProgress
                modules={[Thumbs]}
                className="mb-4"
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`Miniatura ${idx + 1}`}
                      className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer transition transform hover:scale-110 z-10"
                      onClick={() => setZoomImg(img)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>

        {/* Info del animal */}
        <div className="w-full md:w-1/3 order-2 md:order-1 flex flex-col items-center space-y-4 mt-6 md:mt-0">
          <h1 className="text-2xl font-bold">{animal.name}</h1>
          <p className="text-gray-900 dark:text-gray-300 text-center">{animal.description}</p>
          <div className="mt-4 space-y-2 text-gray-800 dark:text-gray-200 text-center">
            <div><span className="font-semibold text-gray-900 dark:text-white">Especie:</span> {animal.species}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Raza:</span> {animal.breed || 'Desconocida'}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Sexo:</span> {animal.sex}</div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">Edad:</span>{' '}
              {animal.age !== null ? `${animal.age} años` : 'No especificada'}
            </div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Tamaño:</span> {animal.size}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Peso:</span> {animal.weight_kg ? `${animal.weight_kg} kg` : 'No especificado'}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Fecha de nacimiento:</span> {animal.birth_date || 'No especificada'}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Fecha de llegada:</span> {animal.arrival_date}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Estado:</span> {animal.status}</div>
            <div><span className="font-semibold text-gray-900 dark:text-white">Chip:</span> {animal.chip_number || 'No'}</div>
          </div>
          {/* Botones de acción uno al lado del otro */}
          <div className="flex flex-row space-x-4 w-full mt-6 justify-center">
            <a
              href={`/adopta/${animal.id}/adoptar`}
              className="flex-1 bg-red-900 hover:bg-red-700 text-white font-semibold py-2 rounded transition text-center"
            >
              Adopta
            </a>
            <a
              href={`/apadrina/${animal.id}/apadrinar`}
              className="flex-1 bg-yellow-900 hover:bg-yellow-700 text-white font-semibold py-2 rounded transition text-center"
            >
              Apadrina
            </a>
            {Boolean(animal.is_fosterable) && (
              <a
                href={`/acoge/${animal.id}/bienvenida`}
                className="flex-1 bg-gray-700 hover:bg-gray-900 text-white font-semibold py-2 rounded transition text-center"
              >
                Acoge
              </a>
            )}
          </div>
        </div>

        {/* Estilos para los bullets de paginación */}
        <style>{`
          .swiper-pagination-bullet {
            background: #991b1b !important; /* red-900 */
            opacity: 0.5;
          }
          .swiper-pagination-bullet-active {
            background: #991b1b !important; /* red-900 */
            opacity: 1;
          }
        `}</style>
      </div>
    </AwraLayout>
  );
};

export default Show;