"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateAccount = () => {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const onCreateAccount = () => {
    setLoader(true);
    GlobalApi.registerUser(userName, email, password).then(
      (resp) => {
        console.log(resp.data.user);
        console.log(resp.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        router.push("/");
        toast("Account Created Successfully");
        setLoader(false);
      },
      (e) => {
        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col gap-3 justify-center items-center p-10 bg-slate-100 border border-gray-400">
        <Image
          src="/logo.png"
          width={200}
          height={200}
          alt="logo for create account "
        />
        <h1 className="font-bold text-4xl">Create an Account</h1>
        <p className="text-gray-600 font-semibold">
          Create your account by using email and password
        </p>
        <div className="flex flex-col gap-5 mt-7 w-full">
          <Input
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            disabled={!(userName || email || password)}
            onClick={() => onCreateAccount()}
          >
            {loader ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
          <h2 className="text-base">
            Already have an Account
            <Link href={"/signin"} className="text-orange-600">
              Click here to SignIn
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
