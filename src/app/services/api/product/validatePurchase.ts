export async function validatePurchase() {
    await fetch(`${process.env.BASE_URL}/api/admin/filter-out-of-stock-product`, { method: "PATCH" });

}