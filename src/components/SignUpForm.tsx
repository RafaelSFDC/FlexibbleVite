"use client";
import FormField from "./FormField";
import { toast } from "sonner";
import { useState } from "react";
import ButtonMotion from "./framerMotion/ButtonMotion";
import { appWriteCreateUser } from "@/app/api/appwrite/api";
import { useRouter } from "next/navigation";

const SignUpForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log("RESULTADO DA FUNÇÃO FORMAT FORM:", data);

    toast.promise(appWriteCreateUser(data, setLoading), {
      loading: "Creating your account...",
      success: (data) => {
        router.push("/");
        return `Your account has been created successfully`;
      },
      error: "Something went wrong, please try again later",
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <FormField
        title="Username"
        type="text"
        name="name"
        placeholder="Enter your Username"
      />
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
      {/* <FormField
        title="Description"
        type="text"
        name="description"
        placeholder="Enter the description of your project"
      />

      <FormField
        title="GitHub URL"
        type="url"
        name="githubUrl"
        placeholder="Enter the URL of your github"
      /> */}
      <div className="flexStart w-full">
        <ButtonMotion type="submit" leftIcon="/plus.svg">
          Create Account
        </ButtonMotion>
      </div>
    </form>
  );
};

export default SignUpForm;
