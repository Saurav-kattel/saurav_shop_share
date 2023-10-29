import { TCartItem } from "@/app/api/product/request-purchase/route";
import { handleInStock } from "@/app/services/api/admin/handleInStock";
import { handleOutOfStock } from "@/app/services/api/admin/handleOutOfStock";
import { isInStock } from "@/app/services/api/admin/isInStock";
import { getQuantity } from "@/app/services/api/product/getQuantity";
import { filterUnwantedData } from "./filterUnwantdData";



type ReturnType = {
    status: number;
    res: {
        message?: string;
        RejectedPurchaseRequest?: boolean;
        PartialProductPurchaseRequest?: boolean;
        PurchaseSuccessfull?: boolean;

    };
};


export async function handlePurchase({ item, userId }: { item: TCartItem, userId: string; }): Promise<ReturnType> {
    try {
        const filteredData = filterUnwantedData(item);
        const { Quantity, InvalidQuantityIdError, GetQuanitiyUnknownError } = await getQuantity(filteredData.quantityId);

        if (InvalidQuantityIdError || GetQuanitiyUnknownError || !Quantity) {
            return { status: 500, res: { message: "invalid quantity id at handle purchase" } };
        }

        if (!userId) {
            return { status: 404, res: { message: "Unable to authenticate" } };
        }

        const { IsInStock, IsInStockUnknownError } = await isInStock({ quantityId: filteredData.quantityId });
        if (!IsInStock) {

            const { status, res } = await handleOutOfStock(filteredData, userId);
            return { status, res };

        } else if (IsInStockUnknownError) {
            return { status: 500, res: { message: IsInStockUnknownError } };
        } else {
            const { status, res } = await handleInStock({ item: filteredData, userId, quantityTotal: Quantity.total });
            return { status, res };
        }
    } catch (error) {
        console.error("Error in PATCH:", error);
        return { status: 500, res: { message: "Internal Server Error" } };
    }
}
