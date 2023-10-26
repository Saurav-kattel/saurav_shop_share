import { getUser } from "./getUser";

export async function isAdmin({ email }: { email: string; }) {
    const ADMIN = "admin";
    let user = await getUser({ email });
    if (!user) {
        return false;
    }
    return user.role.toLowerCase() === ADMIN;
}