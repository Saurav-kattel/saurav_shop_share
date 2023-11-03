import { NextRequest, NextResponse } from "next/server";
const notCookiesPathnames = ['/components/admin/dashboard/purchase-requests', '/components/checkout'];
const cookiesPathnames = ['/components/user/login', '/components/user/register'];


export function middleware(request: NextRequest) {
    if (!request.cookies.get("auth") && notCookiesPathnames.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/components/user/login', request.url));
    }
    if (request.cookies.get("auth") && cookiesPathnames.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/components/product', request.url));
    }
}
