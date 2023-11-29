import prisma from "../../../utils/prisma";

export async function handleRejectPartialOrderItem({
  partialOrderItemId,
  quantityId,
}: {
  partialOrderItemId: string;
  quantityId: string;
}) {
  try {
    await prisma.productRequest.update({
      where: {
        id: partialOrderItemId,
      },
      data: {
        status: "Rejected",
      },
    });
    await prisma.qunatity.update({
      where: {
        id: quantityId,
      },
      data: {
        status: "InStock",
      },
    });
    return { Success: true };
  } catch (error) {
    return { RejectPartialOrderItemUnknownError: error };
  }
}
