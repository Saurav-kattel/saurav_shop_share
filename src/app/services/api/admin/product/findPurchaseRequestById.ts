import prisma from "../../../utils/prisma";

export async function findPurhaseRequestById({ reqId }: { reqId: string }) {
  if (!reqId) {
    return { RequestIdNotFoundError: "Request Id Not Found" };
  }
  const partialOrderItem = await prisma.productRequest.findFirst({
    where: {
      id: reqId,
      status: "Pending",
    },
  });

  if (!partialOrderItem) {
    return { PartialOrderItemNotFoundError: "Item not found" };
  }
  return { PartialOrderItem: partialOrderItem };
}
