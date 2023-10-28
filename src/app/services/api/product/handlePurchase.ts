import { TCartItem } from "@/app/api/product/request-purchase/route";
import { handleInStock } from "@/app/services/api/admin/handleInStock";
import { handleOutOfStock } from "@/app/services/api/admin/handleOutOfStock";
import { isInStock } from "@/app/services/api/admin/isInStock";
import { sendMail } from "@/app/services/api/admin/sendMail";
import { getQuantity } from "@/app/services/api/product/getQuantity";




export async function handlePurchase({ item, userId }: { item: TCartItem, userId: string; }) {
    try {
        const { Quantity, InvalidQuantityIdError, GetQuanitiyUnknownError } = await getQuantity(item.quantityId);

        if (InvalidQuantityIdError || GetQuanitiyUnknownError || !Quantity) {
            return { status: 500, res: { message: "invalid quantity id at handle purchase" } };
        }

        if (!userId) {
            return { status: 404, res: { message: "Unable to authenticate" } };
        }

        const { IsInStock, IsInStockUnknownError } = await isInStock({ quantityId: item.quantityId });
        if (!IsInStock) {
            const result = await handleOutOfStock(item, userId);
            return result;
        } else if (IsInStockUnknownError) {
            return { status: 500, res: { message: IsInStockUnknownError } };
        } else {
            const result = await handleInStock({ item, userId, quantityTotal: Quantity.total });
            return result;
        }
    } catch (error) {
        console.error("Error in PATCH:", error);
        return { status: 500, res: { message: "Internal Server Error" } };
    }
}
