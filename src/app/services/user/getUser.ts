import prisma from "../prisma";
type GetMethod = { email?: string, username?: string, id?: string; };

export async function getUser({ email, username, id }: GetMethod) {
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
        }
    });
    return user;
}