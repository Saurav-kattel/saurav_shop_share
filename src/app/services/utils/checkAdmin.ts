import { decodeToken } from "../api/user/decodeToken";
import { getUser } from "../api/user/getUser";
import prisma from "./prisma";

export async function checkAdmin(cookies: string) {
    const res = await fetch(process.env.BASE_URl + "/api/user/get_user", {
        method: "GET",
        headers: {
            auth: cookies
        }
    });
    const user = await res.json();
    console.log(user);
    return user.res && user.res.user && user.res.user.role === 'Admin';
}