import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import ApiResponse from "./models/api_response";

const authRoutes = ["/backoffice/*", "/account/*", "/api/*", "/admin/*"];

function matchesWildcard(path: string, pattern: string): boolean {
  if (pattern.endsWith("/*")) {
    const basePattern = pattern.slice(0, -2);
    return path.startsWith(basePattern);
  }
  return path === pattern;
}

export async function middleware(request: NextRequest) {
  const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/signin`;
  if (
    authRoutes.some((pattern) =>
      matchesWildcard(request.nextUrl.pathname, pattern)
    )
  ) {
    const token = request.cookies.get("token");
    console.log("token", token);
    // 	// For API routes, we want to return unauthorized instead of
    // 	// redirecting to login
    // if (request.nextUrl.pathname.startsWith("/api")) {
    //   if (!token) {
    //     const response: ApiResponse = {
    //       status: 403,
    //       message: "Unauthorized",
    //     };
    //     return NextResponse.json(response, { status: 401 });
    //   }
    // }
    console.log("checking token undefined", token == undefined);
    // 	// If no token exists, redirect to login
    // if (!token || token == undefined) {
    //   console.log("redirect to", LOGIN);
    //   return NextResponse.redirect(LOGIN);
    // }
    // 	try {
    // 		// Decode and verify JWT cookie
    // 		const payload = {role: "user"}//await verifyJwtToken(token.value);
    // 		if (!payload) {
    // 			// Delete token
    // 			request.cookies.delete('token');
    // 			return NextResponse.redirect(LOGIN);
    // 		}
    // 		// If you have an admin role and path, secure it here
    // 		if (request.nextUrl.pathname.startsWith('/admin')) {
    // 			if (payload.role !== 'admin') {
    // 				return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/access-denied`);
    // 			}
    // 		}
    // 	} catch (error) {
    // 		// Delete token if authentication fails
    // 		request.cookies.delete('token');
    // 		return NextResponse.redirect(LOGIN);
    // 	}
  }

  let redirectToApp = false;
  // Redirect login to app if already logged in
  // if (request.nextUrl.pathname === '/signin') {
  // 	const token = request.cookies.get('token');
  // 	if (token) {
  // 		try {
  // 			const payload = {} //await verifyJwtToken(token.value);
  // 			if (payload) {
  // 				redirectToApp = true;
  // 			} else {
  // 				// Delete token
  // 				request.cookies.delete('token');
  // 			}
  // 		} catch (error) {
  // 			// Delete token
  // 			request.cookies.delete('token');
  // 		}
  // 	}
  // }
  if (redirectToApp) {
    // Redirect to app dashboard
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
  } else {
    // Return the original response unaltered
    return NextResponse.next();
  }
}
