"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is Required"),
});

interface IFormInput {
  username: string;
  password: string;
}

const SignInForm = () => {
  const [state, setState] = useState(false);
  const router = useRouter();
  const [reset, setReset] = useState({});
  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data: IFormInput) => {
    console.log(data);
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    });
    console.log("onsubmit signin",data, res);
    // if (res?.error) {
    //   console.log("error", res.error);
    // } else {
    // }
    // if (res?.url) router.push("/");
  };

  return (
    <>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8">
          <label className="text-black font-medium">Username</label>
          <div className="mt-1">
          <input
            className="w-full p-4 pr-12 text-sm border-gray-500 rounded-lg shadow-sm"
            {...register("username")}
          />
          </div>
        </div>
        <div className="mb-8">
          <label className="text-black font-medium">Password</label>
          <div className="mt-1">
          <input
            className="w-full p-4 pr-12 text-sm border-gray-500 rounded-lg shadow-sm"
            type="password"
            {...register("password")}
          />
          </div>
        </div>

        <button
          className="py-3 px-2 bg-blue-100 rounded"
          type="submit"
          value={"Login"}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default SignInForm;
