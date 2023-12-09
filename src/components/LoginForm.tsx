"use client";
import FormField from "./FormField";
import { toast } from "sonner";
import { useState } from "react";
import ButtonMotion from "./framerMotion/ButtonMotion";
import { appWriteLogin } from "@/app/api/appwrite/api";
import { useRouter } from "next/navigation";

const LoginForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    toast.promise(appWriteLogin(data), {
      loading: "Logging in...",
      success: (data) => {
        router.push("/");
        return `Logged in successfully`;
      },
      error: (data) => {
        console.log(data);
        return "error";
      },
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <FormField
        title="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
      />
      <FormField
        title="Password"
        type="password"
        name="password"
        placeholder="Enter your password"
      />
      <div className="flexStart w-full">
        <ButtonMotion type="submit">Login in</ButtonMotion>
      </div>
    </form>
  );
};

export default LoginForm;
