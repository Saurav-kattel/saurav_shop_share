"use client";
import { Provider } from "react-redux";
import store from "@/redux/app/store";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode; }) {
    return <Provider store={store} >
        {children}
    </Provider>;
}