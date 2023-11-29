import prisma from "@/app/services/utils/prisma";

export async function updateUserPassword({
  userId,
  hash,
}: {
  userId: string;
  hash: string;
}) {
  try {
    let res = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hash,
      },
    });

    return { res };
  } catch (err: any) {
    return { UpdatePasswordError: err };
  }
}
