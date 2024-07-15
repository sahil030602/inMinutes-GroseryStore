import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategory = async (selectedCategory) => {
  const data = await GlobalApi.getCategory();

  return (
    <div className=" mt-2 flex items-center gap-5 overflow-auto justify-center mx-7 md:mx-20 ">
      {data?.data.map((category, index) => (
        // console.log(category.attributes.name)
        <Link
          href={"/product-category/" + category?.attributes?.name}
          key={index}
          className={`p-3 mt-2 rounded-xl bg-green-50 flex flex-col items-center gap-2 group cursor-pointer 
        hover:bg-green-700 hover:text-white w-[150px] max-w-[100] h-[130px] ${
          selectedCategory == category.attributes.name &&
          "bg-green-600 text-white"
        }`}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              category?.attributes?.icons?.data[0]?.attributes?.url
            }
            unoptimized={true}
            alt="icons"
            width={50}
            height={50}
            className="group-hover:scale-110 transition-all ease-in-out"
          />
          <h2
            className={`text-green-800 group-hover:text-white ${
              selectedCategory == category.attributes.name && "text-white"
            }`}
          >
            {category?.attributes?.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategory;
