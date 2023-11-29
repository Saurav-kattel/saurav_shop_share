import prisma from "../../../utils/prisma";

export async function accpetPurchaseRequest({
  item,
  userId,
  quantityTotal,
}: {
  item: any;
  userId: string;
  quantityTotal: number;
}) {
  try {
    if (quantityTotal === 1) {
      try {
        await prisma.productRequest.create({
          data: {
            ...item,
            userId,
            status: "Success",
          },
        });

        await prisma.qunatity.delete({
          where: {
            id: item.quantityId,
          },
        });
      } catch (err: any) {
        return { PurchaseRequestUnknownError: err.message };
      }
    }
    if (quantityTotal === item.requestedQuantity) {
      try {
        await prisma.productRequest.create({
          data: {
            ...item,
            userId,
            status: "Success",
          },
        });
        await prisma.qunatity.delete({
          where: {
            id: item.quantityId,
          },
        });
      } catch (err: any) {
        return { PurchaseRequestUnknownError: err.message };
      }
    }
    if (item.requestedQuantity < quantityTotal) {
      try {
        await prisma.productRequest.create({
          data: {
            ...item,
            userId,
            status: "Success",
          },
        });

        await prisma.qunatity.update({
          where: {
            id: item.quantityId,
          },
          data: {
            total: quantityTotal - item.requestedQuantity,
          },
        });
      } catch (err: any) {
        return { PurchaseRequestUnknownError: err.message };
      }
    }

    return { PurchaseSuccessfull: true };
  } catch (err: any) {
    return { PurchaseRequestUnknownError: err.message };
  }
}
