import { RegisterData, Response } from "@/app/components/user/register/RegisterForm";

export async function handleRegister({
    e,
    setResponse,
    setRegisterData,
    setLoading,
    registerData
}: {
    e: React.FormEvent,
    setResponse: React.Dispatch<React.SetStateAction<Response>>;
    setRegisterData: React.Dispatch<React.SetStateAction<RegisterData>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    registerData: RegisterData;

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
    setLoading(false);
    setResponse(data);

    setRegisterData(registerData => {
        const newRegisteredData: any = {};
        if (data && data.success) {
            return { confirmPassword: "", username: "", email: "", password: '' };
        }

        if (data.res && data.res.validationError) {
            data.res.validationError.map((item: any) => {
                if (item.field == "password") {
                    newRegisteredData.password = '';
                    newRegisteredData.confirmPassword = '';

                }
                if (item.field == "username") {
                    newRegisteredData.username = '';
                }
                if (item.field == "email") {
                    newRegisteredData.email == '';
                    newRegisteredData.password = '';
                    newRegisteredData.confirmPassword = '';
                }
            });
            return { ...registerData, ...newRegisteredData };
        }

        if (data.res && data.res.message.includes("Email")) {
            newRegisteredData.email = '';
            newRegisteredData.password = '';
            newRegisteredData.confirmPassword = '';
        }

        return { ...registerData, ...newRegisteredData };

    });
}