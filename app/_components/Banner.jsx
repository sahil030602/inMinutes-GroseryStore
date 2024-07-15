import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <div>
      <div className="bg-green-700 w-full md:h-[250px] mt-14 flex  md:flex-row justify-between flex-col">
        <div className="md:m-14 m-10">
          <h1 className="text-white font-bold md:text-5xl sm:text-lg ">
            We delivery your Grosery <br />
            with Minutes
          </h1>
          {/* <Link href={"/product-category/"}> */}
            <Button
              variant="outline"
              className="text-primary bg-white hover:bg-primary hover:text-white mt-3"
            >
              Order Now
            </Button>
          {/* </Link> */}
        </div>
        <div>
          <Image src="/png.png" height={300} width={300} alt="deliveryboy" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
