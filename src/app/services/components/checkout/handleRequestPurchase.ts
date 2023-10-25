import { SetStateAction } from "react";
import { resetUserData } from "./resetUserData";
import { validataeUserData } from "./validateUserDetails";
type FinalData = {
    cartId: string;
    productId: string;
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
}[];
export type UserData = {
    firstname: string;
    lastname: string;
    phoneNumber: string;
    province: string;
    zipcode: string;
    userEmail: string;
};
export function handleRequestPurcahse({
    purchaseRequestError,
    finalData,
    clearCart,
    dispatch,
    requestPurchase,
    setShowErrors,
    userData,
    showErrors,
    setUserData
}: {
    purchaseRequestError: any;
    finalData: FinalData;
    clearCart: Function;
    dispatch: Function;
    requestPurchase: Function;
    setShowErrors: React.Dispatch<SetStateAction<any>>;
    userData: UserData;
    showErrors: {
        showError: boolean;
        errors: Record<string, {
            message: string;
        }>;
    };
    setUserData: React.Dispatch<SetStateAction<UserData>>;
}) {
    const removeData: Record<string, string> = {};
    const errors = validataeUserData({ firstname: userData.firstname, lastname: userData.lastname, userEmail: userData.userEmail, phoneNumber: userData.phoneNumber });

    if (Object.keys(errors).length <= 0) {
        dispatch(requestPurchase(finalData));
        dispatch(clearCart());
        resetUserData({ setUserData });
        setShowErrors({ showErrors: false, errors: {} });

    } else {
        setShowErrors({
            showError: Object.keys(errors).length > 0, errors
        });

        Object.keys(userData).forEach((item) => {
            if (showErrors.errors.hasOwnProperty(item)) {
                removeData[item] = "";
            }
        });

        setUserData((userData: UserData) => {
            return {
                ...userData,
                ...removeData
            };
        });
    }

}