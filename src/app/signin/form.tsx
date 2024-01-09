"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react"
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  password: Yup.string().email().required("Password is Required")
})


interface IFormInput {
  username: string;
  password: string;
}




const SignInForm = () => {
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
	 <form className="flex flex-col p-1 gap-3" onSubmit={handleSubmit(onSubmit)}>
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