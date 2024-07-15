"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import GlobalApi from "../_utils/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../_context/CartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [data, setData] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const router = useRouter();
  const { update, setUpdate } = useContext(CartContext);
  const fetchData = async () => {
    let response = await GlobalApi.getCategory();
    if (response.data) {
      setData(response.data);
    }
  };
  useEffect(() => {
    const token = sessionStorage.getItem("jwt");
    fetchData();
    if (token) {
      setIsLogin(true);
    }
  }, []);
  useEffect(() => {
    getCartItems();
  }, [update]);
  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/signin");
  };
  const [subtotal, setSubtotal] = useState();
  useEffect(() => {
    let total = 0;
    cartItemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubtotal(total);
  }, [cartItemList]);
  const getCartItems = async () => {
    const token = sessionStorage.getItem("jwt");
    const user = JSON.parse(sessionStorage.getItem("user"));
    const cartItemsCount = await GlobalApi.getCartItems(user.id, token);
    setTotalCartItems(cartItemsCount?.length);
    console.log(cartItemsCount);
    setCartItemList(cartItemsCount);
  };
  const onDeleteCartItem = (id) => {
    const token = sessionStorage.getItem("jwt");
    GlobalApi.deleteCartItems(id, token).then((resp) => {
      toast("Item Deleted from the Cart");
      getCartItems();
    });
  };

  return (
    <div className="flex justify-between p-5 shadow-sm">
      <div className="flex gap-5 items-center">
        <Link href="">
        <Image src="/logo.png" width={150} height={100} alt="logo" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <h1 className="hidden md:flex items-center gap-2 bg-slate-100 border rounded-full px-5 py-2 cursor-pointer">
              <LayoutGrid className="h-5 w-5" />
              Category
            </h1>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browser Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {data?.map((category, index) => (
              <Link
                href={"/product-category/" + category.attributes.name}
                key={index}
              >
                <DropdownMenuItem className="flex gap-2 items-center cursor-pointer">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category?.attributes?.icons?.data[0]?.attributes?.url
                    }
                    unoptimized={true}
                    alt="icons"
                    width={30}
                    height={30}
                  />
                  <h2 className="text-lg">{category?.attributes?.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex items-center gap-2 rounded-full border p-2 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Sheet className="z-3">
          <SheetTrigger asChild>
            <h1 className="flex gap-2 item-center cursor-pointer">
              <ShoppingBag />
              <span className=" rounded-full px-2 bg-green-800 text-white">
                {totalCartItems}
              </span>
            </h1>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-green-800 text-white font-bold h-[60px] p-4 mt-5 rounded-lg">
                Cart Items
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteCartItem={onDeleteCartItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute bottom-6 w-[90%]">
                <h2 className="flex justify-between items-center font-bold text-lg ">
                  SubTotal<span>${subtotal}</span>
                </h2>
                <Button className="w-full" onClick={()=>router.push(`/checkout/${subtotal}`)}>Checkout</Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/signin"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserIcon className="w-11 h-11 p-1 bg-green-100 rounded-full text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/myOrder"}><DropdownMenuItem>My Order</DropdownMenuItem></Link>
              <DropdownMenuItem onClick={() => onSignOut()}>
                LogOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
