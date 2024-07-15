"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigLeftDash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CheckOut = ({ params }) => {
  const { amount } = params;
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [finalTotal, setFinalTotal] = useState();
  const [cartItemList, setCartItemList] = useState([]);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [zip, setZip] = useState();
  const [address, setAddress] = useState();
  const router = useRouter();
  const tax = Number(amount) * 0.18;
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setFinalTotal(total);
  }, [cartItemList]);
  const getCartItems = async () => {
    const token = sessionStorage.getItem("jwt");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const cartItemsCount = await GlobalApi.getCartItems(user.id, token);
    setTotalCartItems(cartItemsCount?.length);
    setCartItemList(cartItemsCount);
  };
  // console.log(cartItemList)
  const FullTotal = finalTotal + tax + 15;
  const onApprove = (data) => {
    const token = sessionStorage.getItem("jwt");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const payload = {
      data: {
        paymentid: data.paymentid.toString(),
        totalOrderAmount: finalTotal,
        username: name,
        email: email,
        address: address,
        phone: phone,
        zip: zip,
        userid: user.id,
        OrderItemList: cartItemList,
      },
    };
    GlobalApi.createOrder(payload, token).then((resp) => {
      console.log(resp);
      toast("Payment get Successfully!");
      cartItemList.forEach((item, index) => {
        GlobalApi.deleteCartItems(item.id, token).then((resp) => {
          toast("Order place succesfully");
        });
      });
      router.replace("/order-confirmed");
    });
  };
  const handlePaymentBtn = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: finalTotal,
            currency_code: "USD",
          },
        },
      ],
    });
  };
  console.log();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div>
      <h2 className="p-3 bg-primary text-center font-bold text-4xl text-white">
        CheckOut
      </h2>
      <div className=" p-5 px-5 md:px-10 grid md:grid-cols-3  grid-cols-1 py-8">
        <div className="col-span-2 mx-20s">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-3 mt-3">
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-3 mt-3">
            <Input
              type="text"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Zip"
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <Input
              type="text"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="mx-10 border my-4 z-0">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart Item:{totalCartItems}
          </h2>
          <div className="flex flex-col gap-4 px-3 mt-3">
            <h2 className="font-bold justify-between flex">
              Subtotal :<span>${amount}</span>
            </h2>
            <hr></hr>
            <h2 className="flex justify-between">
              Delivery Charges:<span>$15</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (18%):<span>${tax.toFixed(2)}</span>
            </h2>
            <hr></hr>
            <h2 className=" font-bold flex justify-between">
              Total:<span>${FullTotal}</span>
            </h2>
            <Button
              className="bg-primary"
              onClick={() => onApprove({ paymentid: 123 })}
            >
              Payment
              <ArrowBigLeftDash />
            </Button>

            <PayPalButtons
              style={{ layout: "horizontal", color: "blue" }}
              createOrder={handlePaymentBtn}
              onApprove={onApprove}
              onError={(err) => {
                console.error(err);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
