"use client"
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { CartContext } from "./_context/CartContext";
import { useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const[update,setUpdate]=useState(false)
  const params =usePathname()
  const showHeader=params=="/signin"||params=="/createaccount"?false:true
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_KEY_PAYPAL_PAYMENT }}>
    <html lang="en">
      <body className={outfit.className}>
      <CartContext.Provider value={{update,setUpdate}}>
      {showHeader&&<Header/>}
      {children}
      <Toaster/>
      </CartContext.Provider>
         </body>
    </html>
    </PayPalScriptProvider>
  );
}
