import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductDetails from "./ProductDetails";


const ProductItem = (product) => {
  
  return (
    <div className="flex flex-col items-center justify-center border rounded-lg gap-3  p-6 sm:p-2 ">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.product?.attributes?.images?.data[0]?.attributes?.url
        }
        unoptimized={true}
        alt="images"
        width={400}
        height={300}
        className="object-contain w-[200px] h-[200px]"
      />
      <h2 className="font-bold text-lg">{product?.product?.attributes?.name}</h2>
      <div className="flex gap-2">
       {product?.product?.attributes?.sellingcost&&
       <h2 className="font-bold text-lg">${product?.product?.attributes?.sellingcost}</h2>}
      <h2 className= {`font-bold text-lg ${product?.product?.attributes?.sellingcost&& "line-through text-gray-500 font-medium"}`}>${product?.product?.attributes?.mrp}</h2>
      </div>
      <Dialog>
      <DialogTrigger asChild>
      <Button variant="outline" className="text-primary mb-2 hover:text-white hover:bg-primary">Add to Cart</Button>
      </DialogTrigger>
       <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <ProductDetails product={product?.product}/>
          </DialogDescription>
        </DialogHeader>
       </DialogContent>
      </Dialog>

    </div>
  );
};

export default ProductItem;
