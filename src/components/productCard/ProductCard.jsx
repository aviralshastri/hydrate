import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden flex mb-2">
      <div className="w-1/5 h-full flex items-center justify-center">
        <Image 
          src={product.img} 
          alt={product.name} 
          objectFit="cover"
          width={300} height={300}
          className="object-cover w-full h-full flex items-center justify-center"
        />
      </div>
      <div className="w-4/5 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-700 mb-4">Fabric: {product.fabric}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
        </div>
        <div >
          <p className="text-2xl font-semibold text-green-600 ml-2">₹{product.price}</p>
          <button className="bg-yellow-500 text-black font-bold px-4 py-2 rounded-full mt-2">
          Add to cart
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;
