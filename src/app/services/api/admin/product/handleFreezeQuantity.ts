import prisma from "../../../utils/prisma";

export async function handleFreezeQuantity({
  quantityId,
}: {
  quantityId: string;
}) {
  try {
    const freezeQuantity = await prisma.qunatity.update({
      where: {
        id: quantityId,
      },
      data: {
        status: "Freezed",
      },
    });
    if (!freezeQuantity) {
      return { Freezed: false };
    }
    return { Freezed: true };
  } catch (error: any) {
    return { FreezingProductUnknownError: error.message };
  }
}
