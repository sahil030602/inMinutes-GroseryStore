"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import GlobalApi from "@/app/_utils/GlobalApi";
import moment from "moment";
import MyOrderDetails from "./components/MyOrderDetails";
import Image from "next/image";

const MyOrder = () => {
  const [orderItemsList, setOrderItemsList] = useState();
  const router = useRouter();
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (!jwt) {
      router.replace("/");
    }
    getMyOrder();
  }, []);
  const getMyOrder = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const jwt = sessionStorage.getItem("jwt");
    const orderList = await GlobalApi.getMyOrderDetails(user.id, jwt);
    console.log(orderList);
    setOrderItemsList(orderList);
  };
  return (
    <div>
      <h2 className="p-3 bg-primary text-center font-bold text-4xl text-white">
        MyOrder
      </h2>
      <div className="py-3 mx-7 md:mx-20">
        <h2 className="text-3xl text-primary font-bold">Order History</h2>
        <div>
          {orderItemsList?.map((item, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="m-5 border outline-green-500 px-3"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="">
                  <h1>
                    <span className="font-bold mr-2">Order:</span>
                    {moment(item.createdAt).format("DD/MMM/YYYY")}
                  </h1>
                  <h1>
                    <span className="font-bold mr-2">Total:</span>$
                    {item.totalOrderAmount}
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  {item.OrderItemList.map((order,index)=>(
                  <MyOrderDetails orderItem={order} key={index} />
                  ))}
                  {/* <MyOrderDetails orderItem={orderItem}/> */}

                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
