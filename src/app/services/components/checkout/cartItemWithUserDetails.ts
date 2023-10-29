export function cartItemWithUserDetils({ cartItem, userDetails }: {
    cartItem: any[]; userDetails: {
        firstname: string;
        lastname: string;
        phoneNumber: string;
        province: string;
        zipcode: string;
        userEmail: string;
    };
}) {

    const detailsArray: {
        cartId: string,
        productId: string;
        productName: string;
        imageUrl: string;
        size: string;
        color: string;
        productQuantity: number;
        price: number;
        quantityId: string;
        firstname: string;
        lastname: string;
        province: string;
        zipcode: string;
        userEmail: string;
        phoneNumber: string;
    }[] = [];

    cartItem.map((item) => {
        detailsArray.push({
            cartId: item.cartId,
            productId: item.productId,
            productName: item.productName,
            imageUrl: item.imageUrl,
            size: item.size,
            color: item.color,
            productQuantity: item.productQuantity,
            price: item.price,
            quantityId: item.quantityId,
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            province: userDetails.province,
            zipcode: userDetails.zipcode,
            userEmail: userDetails.userEmail,
            phoneNumber: userDetails.phoneNumber
        });
    }
    );
    return detailsArray;
}