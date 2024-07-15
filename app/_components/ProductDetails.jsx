"use client"
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderIcon, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { CartContext } from "../_context/CartContext";

const ProductDetails = ({ product }) => {
  console.log(product);
  const jwt=sessionStorage.getItem("jwt")
  const user =JSON.parse(sessionStorage.getItem("user"))
  const{update,setUpdate}=useContext(CartContext)
  const [productTotalPrice, setProductTotalPrice] = useState(0)
  const [loader,setLoader]=useState(false)
  const router=useRouter()
  useEffect(() => {
    const sellingCost = product?.attributes?.sellingcost;
    const mrp = product?.attributes?.mrp;
    if (sellingCost) {
      setProductTotalPrice(sellingCost);
    } else if (mrp) {
      setProductTotalPrice(mrp);
    }
  }, [product]); 
  const [quantity, setQuantity] = useState(1);
  const addtoCart=()=>{
    setLoader(true)
   if(!jwt){
    router.push("/signin")
    return
   }

   const data={
    data:{
      quantity:quantity,
      amount:quantity*productTotalPrice,
      product_item:product.id,
      users_permissions_user:user.id,
      userid:user.id
    }
   }
   console.log(data)
   GlobalApi.addToCart(data,jwt).then(resp=>{
    console.log(resp)
    toast("Item Added to Cart")
    setLoader(false)
    setUpdate(!update)
   },(e)=>{
    toast("Something Went Wrong")
    setLoader(false)
   })
  }
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2 text-black bg-white">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={400}
        height={400}
        unoptimized={true}
        alt="productImage"
        className="object-contain w-full h-[300px] "
      />
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-4xl">
          {product?.attributes?.name}
        </h1>
        <h1 className=" text-base text-gray-600">
          {product?.attributes?.description}
        </h1>
        <div>
          <div className="flex gap-3 items-center ">
            {product?.attributes?.sellingcost && (
              <h2 className="font-bold text-2xl">
                ${product?.attributes?.sellingcost}
              </h2>
            )}
            <h2
              className={`font-bold text-2xl ${
                product?.attributes?.sellingcost &&
                "line-through text-gray-500 font-medium"
              }`}
            >
              ${product?.attributes?.mrp}
            </h2>
          </div>
          <h2 className="font-bold text-lg">
            Quantity ({product?.attributes?.itemQuantity})
          </h2>
          <div className="flex gap-5 items-center mt-3">
            <div className="flex gap-10 items-center border p-2 px-5">
              <button
                className="text-xl" disabled={quantity==1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2 className="font-semibold text-lg">
                {quantity}
                </h2>
              <button
                className="text-xl"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <h2 className="text-2xl font-bold">=  ${quantity*productTotalPrice}</h2>
          </div>
        </div>
        <div>
          <Button className="flex items-center gap-2 bg-primary text-white" disabled={loader} onClick={()=>addtoCart()}>
            <ShoppingBag /> {loader?<LoaderIcon className="animate-spin"/>:"Add to Cart"}
          </Button>
        </div>
        <h2><span>Category :</span>{product?.attributes?.categories?.data?.attributes?.name}</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
