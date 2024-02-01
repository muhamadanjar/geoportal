import SignInForm from "./form";

const SignInPage = () => {
	return ( <>
		<div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
			<h1></h1>
			<p className="max-w-md mx-auto mt-4 text-center text-gray-500"></p>

			<div className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-md border border-gray-200 bg-white">


				<SignInForm/>
			</div>
		</div>
	</> );
}
 
export default SignInPage;