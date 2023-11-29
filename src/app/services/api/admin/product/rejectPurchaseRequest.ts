import prisma from "../../../utils/prisma";

export async function rejectPurchaseRequest({
  purchaseProductData,
  userId,
}: {
  purchaseProductData: any;
  userId: string;
}) {
  try {
    let product = await prisma.productRequest.create({
      data: {
        ...purchaseProductData,
        userId,
        status: "Rejected",
      },
    });
    if (!product) {
      return {
        RejcectingPurchaseRequestFailed: "Error Creating Product Request",
      };
    }
    return { RejectedPurchaseRequest: true };
  } catch (err: any) {
    return { RejectPurchaseRequestUnknownError: err };
  }
}
