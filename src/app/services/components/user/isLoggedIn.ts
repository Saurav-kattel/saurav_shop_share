import { useCookies } from "next-client-cookies";

export function isLoggedIn() {
    const cookie = useCookies();
    return cookie.get("auth");
}