
import NextAuth from "next-auth"
import type { AuthOptions, Awaitable, RequestInternal, User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Client Credential",
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" }
			},
			async authorize (credentials, req) {
				if (typeof credentials !== "undefined") {
					// const res = await authenticate(credentials.email, credentials.password)
					const user = { id: "1", name: "Admin", email: "admin@admin.com" };
					return user;

					// if (typeof res !== "undefined") {
					// 	return { ...res.user, apiToken: res.token }
					// } else {
					// 	return null
					// }
				}else{
					return null
				}
			}
		})
	],
	session: { strategy: "jwt"}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
