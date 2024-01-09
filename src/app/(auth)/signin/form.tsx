"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import Input from "@/components/ui/forms/input";
import EyeIcon from "@/components/icons/eye";
import EyeSlashIcon from "@/components/icons/eye-slash";
const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().email().required("Password is Required")
})


interface IFormInput {
  username: string;
  password: string;
}




const SignInForm = () => {
	const [state, setState] = useState(false);
	const router = useRouter();
	const [reset, setReset] = useState({});
	const {
    	register,
    	handleSubmit,
  	} = useForm<IFormInput>({
		resolver: yupResolver(validationSchema),
	});
	const onSubmit = async (data: IFormInput) => {
    	console.log(data);
		const res = await signIn("credentials", {
			redirect: false,
			username: data.username,
			password: data.password
		});
			console.log(res);
		if (res?.error){
		}else{

		}
		if (res?.url) router.push("/");
  	};

	return ( <>
	 <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onSubmit)}>
		<Input
			type="email"
			placeholder="Enter your email"
			inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
		/>
		<div className="relative">
			<Input
			type={state ? 'text' : 'password'}
			placeholder="Password"
			inputClassName="focus:!ring-0 placeholder:text-[#6B7280]"
			/>
			<span
			className="absolute bottom-3 right-4 cursor-pointer text-[#6B7280] rtl:left-4 rtl:right-auto sm:bottom-3.5"
			onClick={() => setState(!state)}
			>
			{state ? (
				<EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
			) : (
				<EyeSlashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
			)}
			</span>
		</div>
		<div className="mb-8">
			<label>username</label>
  	    	<input {...register("username")} />
		</div>
		<div className="mb-8">
			<label>Password</label>
  	    	<input type="password" {...register("password")} />
		</div>

		<button className="py-3 px-2 bg-blue-100 rounded" type="submit" value={"Login"} >Login</button>

	 </form>
	
	</> );
}
 
export default SignInForm;