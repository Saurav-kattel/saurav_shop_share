import { NextRequest, NextResponse } from "next/server";
import { checkAdmin } from "./app/services/utils/checkAdmin";
const notCookiesPathnames = [
  "/components/admin/dashboard/purchase-requests",
  "/components/checkout",
];
const cookiesPathnames = [
  "/components/user/login",
  "/components/user/register",
];

export async function middleware(request: NextRequest) {
  if (
    !request.cookies.get("auth") &&
    notCookiesPathnames.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(
      new URL("/components/user/login", request.url)
    );
  }
  if (
    request.cookies.get("auth") &&
    cookiesPathnames.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/components/product", request.url));
  }
  if (
    !request.cookies.get("auth") &&
    request.nextUrl.pathname.match("^/admin")
  ) {
    return NextResponse.redirect(
      new URL("/components/user/login", request.url)
    );
  }
  const admin = await checkAdmin(request.cookies.get("auth")?.value ?? "");

  if (
    (admin === false || admin === undefined) &&
    request.nextUrl.pathname.match("^/admin")
  ) {
    return NextResponse.redirect(
      new URL("/unethical/dirty-hacker/bad-human", request.url)
    );
  }
}
