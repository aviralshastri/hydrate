import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full bg-white shadow-md flex flex-col items-center justify-center rounded-lg overflow-hidden mb-2">
      <div className="w-full h-full flex items-center justify-center">
        <Image
          src={product.img}
          alt={product.name}
          objectFit="cover"
          className="object-cover w-3/5 h-3/5"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">Fabric: {product.fabric}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-xl font-semibold text-green-600">₹{product.price}</p>
        <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-full mt-4 w-full">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
