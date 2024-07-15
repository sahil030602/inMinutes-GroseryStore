import React from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

const Categories = async () => {
  const data = await GlobalApi.getCategory();

  return (
    <div className="mt-5">
      <h1 className="text-green-600 font-extrabold text-xl">Shop by the use of Category</h1>
      <div className=" mt-2 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 sm:grid-cols-2 gap-5">
      {data?.data.map((category, index) => (
        <Link href={"/product-category/"+category.attributes.name} key={index} className="p-3 mt-2 rounded-xl bg-green-50 flex flex-col items-center gap-2 group cursor-pointer 
        hover:bg-green-700 hover:text-white">
          <Image src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              category?.attributes?.icons?.data[0]?.attributes?.url
            }
            unoptimized={true}
            alt="icons"
            width={50}
            height={50}
            className="group-hover:scale-110 transition-all ease-in-out"
            
          />
          <h2 className="text-lg">{category?.attributes?.name}</h2>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Categories;
