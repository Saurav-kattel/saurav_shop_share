import prisma from "../../utils/prisma";
type GetMethod = { email?: string, username?: string, id?: string; withPassword?: boolean; };

export async function getUser({ email, username, id, withPassword = true }: GetMethod) {
    let fieldData: GetMethod = {};
    if (email) {
        fieldData["email"] = email;
    } if (username) {
        fieldData.username = username;
    }
    if (id) {
        fieldData.id = id;
    }
    let user = await prisma.user.findFirst({
        where: {
            ...fieldData
        },
        select: {
            username: true,
            email: true,
            role: true,
            password: withPassword,
            id: true,
        }
    });
    return user;

}