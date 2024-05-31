import Image from 'next/image';
import { useState, useEffect } from 'react';
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

const Carousal = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37) { // Left arrow key
        goToPrevious();
      } else if (event.keyCode === 39) { // Right arrow key
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentImageIndex, images]);

  return (
    <div className="relative">
      <div className="overflow-hidden w-full relative">
        <div
          className="flex transition-transform duration-300 ease-in-out transform"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 flex justify-center">
              <Image src={image} alt={`Slide ${index}`} width={500} height={250} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-2 rounded-full z-10"
      >
        <HiArrowNarrowLeft size={30} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white px-2 py-2 rounded-full z-10"
      >
        <HiArrowNarrowRight size={30} />
      </button>
    </div>
  );
};

export default Carousal;
