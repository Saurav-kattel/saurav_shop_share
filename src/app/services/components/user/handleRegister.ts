import { RegisterData, Response } from "@/app/components/user/register/RegisterForm";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export async function handleRegister({
    e,
    setResponse,
    setRegisterData,
    setLoading,
    registerData,
    router
}: {
    e: React.FormEvent,
    setResponse: React.Dispatch<React.SetStateAction<Response>>;
    setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    registerData: RegisterData;
    router: AppRouterInstance;
}) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify({
            username: registerData.username,
            password: registerData.password,
            email: registerData.email
        })
    });

    const data = await res.json();
    setResponse(data);
    setLoading(false);

    setRegisterData(registerData => {
        const newRegisteredData: any = {};

        if (data && data.success) {
            return { confirmPassword: "", username: "", email: "", password: '' };
        }

        if (data.res && data.res.validationError) {
            if (data.res.validationError.field == "password") {
                newRegisteredData.password = '';
                newRegisteredData.confirmPassword = '';

            }
            if (data.res.validationError.field == "username") {
                newRegisteredData.username = '';
            }

            if (data.res.validationError.field == "email") {
                newRegisteredData.email == '';
                newRegisteredData.password = '';
                newRegisteredData.confirmPassword = '';
            }
            return { ...registerData, ...newRegisteredData };
        }

        if (data.res && data.res.message.includes("email")) {
            newRegisteredData.email = '';
            newRegisteredData.password = '';
            newRegisteredData.confirmPassword = '';
        }

        return { ...registerData, ...newRegisteredData };

    });
    if (data.success) {
        router.push("/");
        router.refresh();
    }
    setTimeout(() => {
        setResponse({
            res: undefined,
            success: undefined
        });

    }, 2500);

}