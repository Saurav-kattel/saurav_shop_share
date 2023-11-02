import React, { SetStateAction } from "react";

export async function handleLogin({ loginData, setLoading, setLoginData, setResponse, e }: {
    loginData: {
        email: string,
        password: string;
    };
    setLoginData: React.Dispatch<SetStateAction<typeof loginData>>;
    setResponse: React.Dispatch<SetStateAction<{ res: { message?: string, success?: boolean; }; } | undefined>>;
    e: React.FormEvent;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
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
    setTimeout(() => {
        setResponse({
            res: {
                message: "",
                success: false
            }
        });
        setLoginData((loginData) => {
            if (data.res.message.includes("Email")) {
                return { ...loginData, email: "", password: "" };
            }
            return { ...loginData, password: "" };
        });
    }, 3000);

};