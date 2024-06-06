import Layout from "@/components/layout/Layout";
import { useRouter } from "next/router";
import ProductCard from "@/components/ProductCard/ProductCard";
import MobileProductCard from "@/components/ProductCard/MobileProductCard";
import { useState } from "react";
import { RiFilter3Fill } from "react-icons/ri";
import FilterCard from "@/components/FilterCard/FilterCard";
import img1 from "@/assets/productImages/1.jpg";
import img2 from "@/assets/productImages/2.jpg";
import img3 from "@/assets/productImages/3.jpg";
import SmallScreenFilterCard from "@/components/FilterCard/SmallScreenFilterCard";

function Products() {
  const router = useRouter();
  const { data, category } = router.query;
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

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <Layout>
      <div>
        <div className="hidden lg:block">
          <div className="flex flex-row p-10 space-x-2">
            <div className="w-1/5 flex flex-col">
              <div className="flex flex-row ml-2">
                <RiFilter3Fill size={30} />
                <h1 className="text-start text-xl font-semibold ml-2">
                  Filters
                </h1>
              </div>
              <FilterCard />
              <div className="border border-solid border-gray-200 rounded-lg p-4 w-full mt-2 flex items-center justify-center">
                <button className="p-2 w-full font-bold text-white bg-blue-600 rounded-full hover:bg-blue-500">
                  Apply Filters
                </button>
              </div>
            </div>
            <div className="w-4/5">
              <h1 className="text-start text-xl ml-2 font-semibold">
                Search results for "{data}"
              </h1>
              <div className="border border-solid border-gray-200 rounded-lg p-4 w-full">
                {products.map((productData, index) => (
                  <ProductCard key={index} product={productData} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block lg:hidden p-4">
          <div className="flex flex-row items-end justify-end">
            <button onClick={openBottomSheet}>
              <div className="flex flex-row items-end justify-end">
                <RiFilter3Fill size={30} />
              </div>
            </button>
            <SmallScreenFilterCard
              isOpen={isBottomSheetOpen}
              onClose={closeBottomSheet}
            />
          </div>
          <h1 className="text-start text-xl ml-2 font-semibold">
            Search results for "{data}"
          </h1>
          <div className="border border-solid border-gray-200 rounded-lg p-4 w-full">
            {products.map((productData, index) => (
              <ProductCard key={index} product={productData} />
            ))}
          </div>
        </div>
        <div className="block sm:hidden p-4">
          <div className="flex flex-row items-end justify-end">
            <button onClick={openBottomSheet}>
              <div className="flex flex-row items-end justify-end">
                <RiFilter3Fill size={30} />
              </div>
            </button>
            <SmallScreenFilterCard
              isOpen={isBottomSheetOpen}
              onClose={closeBottomSheet}
            />
          </div>
          <h1 className="text-start text-xl ml-2 font-semibold">
            Search results for "{data}"
          </h1>
          <div className="border border-solid border-gray-200 rounded-lg p-4 w-full">
            {products.map((productData, index) => (
              <MobileProductCard key={index} product={productData} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
