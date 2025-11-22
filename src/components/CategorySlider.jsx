import React, { useState } from "react";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination } from "swiper/modules";
import PropTypes from "prop-types";

export default function CategorySlider({ products = [], mycategory }) {
  const [swiperRef, setSwiperRef] = useState(null);

  const filteredListings = products.filter(
    (listing) =>
      Array.isArray(listing.category) &&
      listing.category.some((categories) => categories.includes(mycategory))
  );

  const handleNext = () => swiperRef && swiperRef.slideNext();
  const handlePrev = () => swiperRef && swiperRef.slidePrev();

  return (
    <div className="swipercontainer mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6">Guest Favourite</h1>

      {/* OUTER SWIPER */}
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        spaceBetween={20}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {filteredListings.length > 0 ? (
          filteredListings.map((res, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className="border rounded-lg overflow-hidden shadow-sm w-full cursor-pointer">
                <Link href={`/posts/${encodeURIComponent(res.id)}`}>

                  {/* INNER IMAGE SWIPER */}
                  <div className="relative w-full h-64">
                    <Swiper
                      slidesPerView={1}
                      pagination={{ clickable: true }}
                      modules={[Pagination]}
                      className="innerSwiper h-full"
                    >
                      {res.images?.length > 0 ? (
                        res.images.map((imgx, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <div className="relative w-full h-64">
                              <Image
                                src={imgx}
                                alt={`Slide ${imgIndex}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        <p>No images available</p>
                      )}
                    </Swiper>
                  </div>

                  {/* DETAILS */}
                  <div className="p-4">
                    <h3 className="text-lg">{res.title}</h3>
                    <p className="text-sm text-gray-500">
                      Hosted by {res.host}
                    </p>
                    <p className="text-sm text-gray-500">
                      {res.city}, {res.country}
                    </p>
                    <p className="text-sm font-semibold">{res.availability}</p>
                  </div>

                </Link>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No items available</p>
        )}
      </Swiper>

      {/* CUSTOM BUTTONS */}
      <button
        onClick={handlePrev}
        className="swiper-button-prev-custom2 absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={handleNext}
        className="swiper-button-next-custom1 absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

CategorySlider.propTypes = {
  products: PropTypes.array.isRequired,
  mycategory: PropTypes.string.isRequired,
};
