import React, { SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
export async function handleLogin({ loginData, router, setLoading, setLoginData, setResponse, e }: {
    loginData: {
        email: string,
        password: string;
    };
    setLoginData: React.Dispatch<SetStateAction<typeof loginData>>;
    setResponse: React.Dispatch<SetStateAction<{ res: { message?: string, success?: boolean; }; }>>;
    e: React.FormEvent;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
    router: AppRouterInstance;
}) {
    e.preventDefault();

    setLoading(true);
    const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            email: loginData.email,
            password: loginData.password
        })
    });
    const data = await response.json();
    setResponse(data);
    setLoading(false);
    setLoginData((loginData) => {
        if (data.res && data.res.message.includes("Email")) {
            return { ...loginData, email: "", password: "" };
        } else if (data.res && data.res.message.includes("Password")) {
            return { ...loginData, password: "" };
        }
        return { ...loginData, email: "", password: "" };
    });


    setTimeout(() => {
        setResponse({
            res: {
                message: "",
                success: false
            }
        });

        if (data.success) {
            router.push("/");
        }
    }, 2500);

};