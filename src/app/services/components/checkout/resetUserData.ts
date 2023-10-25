import React, { SetStateAction } from "react";
import { UserData } from "./handleRequestPurchase";

export function resetUserData({ setUserData }: { setUserData: React.Dispatch<SetStateAction<any>>; }) {
    setUserData((userData: UserData) => {
        return {
            ...userData,
            firstname: "",
            lastname: "",
            userEmail: "",
            phoneNumber: "",
            province: "Koshi"
        };
    });
}