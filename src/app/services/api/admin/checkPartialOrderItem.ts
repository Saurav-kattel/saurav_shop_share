
export async function checkPartialOrderItem({ quantity, requestedQuantity }: { quantity: any; requestedQuantity: number; }) {
    if (!quantity) {
        return { InvalidQunatityIdError: "Quantity Not Found" };
    }

    if (requestedQuantity > quantity?.total) {
        return { IsPartialOrderRequest: true };
    } else {
        return { IsPartialOrderRequest: false };
    }
}