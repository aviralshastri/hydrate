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
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 border border-solid border-black p-8 rounded-xl">
          <div className="lg:order-2">
            <Carousal images={images} />
          </div>
          <div className="lg:order-1">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {productDetails.name}
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              {productDetails.material}
            </p>
            <p className="text-xl text-gray-800 mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, aliquid.
            </p>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                ₹{productDetails.price}
              </h2>
              <div className="flex space-x-4">
                <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                  Add to Cart
                </button>
                <button className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
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
