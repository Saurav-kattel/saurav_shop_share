import prisma from "../../utils/prisma";

type User = {
    username: string,
    email: string,
    hash: string;
};
export async function createUser({ username, email, hash }: User) {
    try {
        let user = await prisma.user.create({
            data: {
                username,
                email,
                password: hash
            }
        });
        return { user };
    } catch (err: any) {
        return { error: err.mesaage };
    }
}