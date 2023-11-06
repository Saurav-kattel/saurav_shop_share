"use client";
import { handleRegister } from '@/app/services/components/user/handleRegister';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export type RegisterData = { username: string, email: string, password: string, confirmPassword: string; };
export type Response = { success?: boolean; res?: { message?: string, validationError?: { field: string, message: string; }; }; };
const RegisterForm = () => {
    const [registerData, setRegisterData] = useState<RegisterData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [response, setResponse] = useState<Response>({
        res: {
            message: undefined,
            validationError: undefined
        },
        success: undefined,
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (
        <div className='flex flex-col items-center justify-center bg-zinc-200 w-full h-[89vh]'>
            <div className='flex flex-col  w-[85vw] shadow-xl items-center py-4  justify-center bg-zinc-200 gap-1 '>
                <h1 className='text-4xl  text-center text-zinc-500 p-4'>Welcome</h1>
                <p className='text-center p-2 text-zinc-600'>Register  with credentials</p>
                <form
                    className='flex flex-col items-center justify-center'
                    onSubmit={async (e) => {
                        await handleRegister({ e, setLoading, router, registerData, setResponse, setRegisterData });
                    }}
                >
                    <label>
                        <fieldset className={`border-[1px] ${response.res && ((response.res.message && response.res.message.includes("username")) || (response.res.validationError && response.res.validationError.field === "username")) ? "border-red-700 text-red-700" : "border-zinc-800 text-zinc-500"} rounded-md  px-2 py-1`}>
                            <legend className='text-center font-bold p-1'>
                                {response.res && (response.res.validationError && response.res.validationError.field === 'username') ? <div>invalid username</div> : "Username"}
                            </legend>
                            <input
                                className='outline-none bg-transparent  underline underline-offset-2 font-light  px-2 w-[25vw]'
                                type="text"
                                value={registerData.username}
                                onChange={(e) => {
                                    setRegisterData((registerData => {
                                        return { ...registerData, username: e.target.value };
                                    }));
                                }}
                            />
                        </fieldset>
                    </label>
                    <label>
                        <fieldset className={`border-[1px] ${response.res && ((response.res.message && response.res.message.includes("email")) || (response.res.validationError && response.res.validationError.field === "email")) ? "border-red-700 text-red-700" : "border-zinc-800 text-zinc-500"} rounded-md px-2 py-1`}>
                            <legend className='text-center font-bold px-2'>
                                {response.res && ((response.res.message && response.res.message.includes("email")) || (response.res.validationError && response.res.validationError.field === "email")) ? <div>
                                    invalid email
                                </div> : "Email"}
                            </legend>

                            <input
                                className='outline-none bg-transparent  underline underline-offset-2 font-light px-2 w-[25vw]'
                                type="email"
                                value={registerData.email}
                                onChange={(e) => {
                                    setRegisterData((registerData => {
                                        return { ...registerData, email: e.target.value };
                                    }));
                                }}
                            />
                        </fieldset>
                    </label>
                    <label>
                        <fieldset className={`border-[1px] ${response.res && ((response.res.message && response.res.message.includes("password")) || (response.res.validationError && response.res.validationError.field === "password")) ? "border-red-700 text-red-700" : "border-zinc-800 text-zinc-500"} border-zinc-800 rounded-md px-2 py-1`}>
                            <legend className='text-center font-bold  px-2'>  {response.res && ((response.res.message && response.res.message.includes("password")) || (response.res.validationError && response.res.validationError.field === "password")) ? <div>
                                weak passowrd
                            </div> : "Password"}</legend>

                            <input
                                className={`outline-none bg-transparent  underline underline-offset-2 font-light  px-2 w-[25vw]`}
                                type="password"
                                value={registerData.password}
                                onChange={(e) => {
                                    setRegisterData((registerData => {
                                        return { ...registerData, password: e.target.value };
                                    }));
                                }}
                            />
                        </fieldset>
                    </label>
                    <label>
                        <fieldset className={`border-[1px] border-zinc-800 rounded-md px-2 py-1`}>
                            <legend className='text-center text-zinc-500 font-bold px-2'> Confirm Password</legend>
                            <input
                                className='outline-none bg-transparent text-zinc-500 underline underline-offset-2 font-light  px-2 w-[25vw]'
                                type="password"
                                value={registerData.confirmPassword}
                                onChange={(e) => {
                                    setRegisterData((registerData => {
                                        return { ...registerData, confirmPassword: e.target.value };
                                    }));
                                }}
                            />
                        </fieldset>
                    </label>
                    <div className="">
                        {loading ? <div className='w-[14vw] h-[6vh] p-4 text-center   mt-4'>Loding...</div> : <Button className="bg-slate-900 text-white text-center hover:bg-zinc-200   hover:scale-110 hover:text-slate-900 w-[14vw] h-[6vh] mt-4 hover:border-slate-800 border-[1px]" variant={"secondary"}>register </Button>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;    