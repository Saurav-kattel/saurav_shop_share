export function filterUnwantedData(item: any) {
    return {
        cartId: item.cartId,
        color: item.color,
        requestedQuantity: item.requestedQuantity,
        productId: item.productId,
        size: item.size,
        price: item.price,
        userId: '',
        quantityId: item.quantityId,
        firstname: item.firstname,
        lastname: item.lastname,
        userEmail: item.userEmail,
        province: item.province,
        zipcode: item.zipcode,
        phoneNumber: item.phoneNumber

    };

}