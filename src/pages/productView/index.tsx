import React from "react";
import Layout from "@/components/layout/Layout";
import Carousal from "@/components/imageslider/carousel";
import SimilarProductCard from "@/components/productCard/SimilarProductCard";
import img1 from "@/assets/productImages/1.jpg";
import img2 from "@/assets/productImages/2.jpg";
import img3 from "@/assets/productImages/3.jpg";

function ProductView() {
  const productDetails = {
    name: "Product Name",
    price: 500,
    material: "Cotton",
  };
  const products = [
    {
      img: img1,
      name: "Awesome Product",
      fabric: "100% Cotton",
      description: "This is an awesome product made from the finest materials.",
      price: 499.99,
    },
    {
      img: img2,
      name: "Awesome Product",
      fabric: "100% Cotton",
      description: "This is an awesome product made from the finest materials.",
      price: 499.99,
    },
    {
      img: img3,
      name: "Awesome Product",
      fabric: "100% Cotton",
      description: "This is an awesome product made from the finest materials.",
      price: 499.99,
    },
  ];
  const images = [img1, img2, img3];

  return (
    <Layout title="hydrate" navbar={true}>
      <div className="container mx-auto px-4 lg:px-8 pb-8 pt-4">
        <div className="flex flex-col lg:flex-row gap-12 border border-solid border-black p-8 rounded-xl">
          <div className="flex-1 lg:order-2">
            <Carousal images={images} />
          </div>
          <div className="lg:hidden my-8 border-t border-gray-300"></div>{" "}
          <div className="flex-1 lg:order-1 lg:pr-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {productDetails.name}
            </h1>
            <p className="text-base lg:text-lg text-gray-600 mb-4">
              Material: {productDetails.material}
            </p>
            <p className="text-lg lg:text-base text-gray-700 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, aliquid.
            </p>
            <div className="flex sm:flex-row flex-col sm:items-center items-start sm:justify-between">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
                ₹{productDetails.price}
              </h2>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 ease-in-out">
                  Add to Cart
                </button>
                <button className="bg-green-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition duration-300 ease-in-out">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:order-1 w-px bg-gray-300 mx-8"></div>{" "}
        </div>

        <div className="mt-12 border border-solid border-black p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Specifications
          </h2>
          <table className="w-full bg-white border text-gray-800 border-gray-300">
            <tbody>
              {Object.entries(productDetails).map(([key, value]) => (
                <tr key={key}>
                  <td className="py-2 px-4 border border-gray-300">{key}</td>
                  <td className="py-2 px-4 border border-gray-300">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 border border-solid border-black p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Product Description
          </h2>
          <p className="text-lg text-gray-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio maxime
            facere velit quas tempora sunt cum porro maiores aperiam
            necessitatibus!
          </p>
        </div>

        <div className="mt-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Similar Products
          </h1>
          <div className="flex justify-center items-center w-full">
            <SimilarProductCard products={products} />
          </div>
        </div>

      </div>
    </Layout>
  );
}

export default ProductView;
