"use client";
import Image from "next/image";
import React from "react";

const MyOrderDetails = (orderItem) => {
  return (
    <div className="grid grid-cols-4 mt-3 px-4 items-center">
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+
          orderItem.orderItem?.product_item?.data?.attributes?.images?.data[0]
            ?.attributes?.url
        }
        width={70}
        height={70}
        alt="image"
        className="bg-gray-100 h-[70px]"
      />
      <div className="col">
        <h2>{orderItem.orderItem?.product_item?.data?.attributes?.name}</h2>
        <h2>
          Item Price:{orderItem.orderItem?.product_item?.data?.attributes?.mrp}
        </h2>
      </div>
      <h2>Quantity:{orderItem.orderItem?.Qunatity}</h2>
      <h2>Price:{orderItem.orderItem?.price}</h2>
    </div>
  );
};

export default MyOrderDetails;
