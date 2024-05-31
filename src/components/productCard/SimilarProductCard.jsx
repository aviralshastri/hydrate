import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = ({ product }) => {
  return (
    <div className="w-72 bg-white shadow-md flex flex-col items-center justify-center rounded-lg overflow-hidden mb-4">
      <div className="w-full flex items-center justify-center mb-4 px-2">
        <Image
          src={product.img}
          alt={product.name}
          className="object-cover w-2/3"
        />
      </div>
      <div className="p-4 mt-4">
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">Fabric: {product.fabric}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-green-600">₹{product.price}</p>
        <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-full mt-4 w-full">
          Add to cart
        </button>
      </div>
    </div>
  );
};

const SimilarProductCarousel = ({ products }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      sliderRef.current.slickNext();
    } else {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="w-full flex justify-center items-center mt-10" onWheel={handleWheel}>
      <div className="w-full max-w-screen-lg px-4">
        <Slider ref={sliderRef} {...settings}>
          {products.map((product, index) => (
            <div key={index} className="px-2">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SimilarProductCarousel;
