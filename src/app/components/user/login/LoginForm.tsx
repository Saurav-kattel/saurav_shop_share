"use client";
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { handleLogin } from '@/app/services/components/user/handleLogin';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{ res: { message?: string | undefined, success?: boolean; }; }>({
        res: {
            message: undefined,
            success: false
        }
    });
    const router = useRouter();
    return (
        <div className='w-full flex flex-col justify-center items-center m-0 h-[89vh] bg-zinc-200'>
            <div className='flex flex-col shadow-xl w-[85vw] py-5  justify-center items-center gap-1'>
                <h1 className='text-4xl  text-center text-zinc-500 p-4'>Welcome</h1>
                <p className='text-center p-2 text-zinc-600'>Login in with email</p>
                <form className=' flex flex-col justify-center items-center gap-1 w-[30vw] outline-none' onSubmit={async (e) => await handleLogin({ e, setLoginData, router, setResponse, setLoading, loginData })
                }>
                    <label className='flex flex-col gap-1'>
                        <fieldset className={`border-[1px] rounded-lg px-2 py-1
                         ${response.res && (response.res.message?.includes("User") || response.res.message?.includes("Email")) ? " border-red-800 text-red-700" : "border-zinc-800"}
                        `}>
                            <legend className='p-1 text-center font-bold text-zinc-500 '>
                                {response.res && (response.res.message?.includes("User") || response.res.message?.includes("Email")) ? <p className='text-red-700'>
                                    {response.res.message}
                                </p>
                                    : "Email"}
                            </legend>

                            <input
                                type="email"
                                name='email'
                                className='outline-none bg-transparent rounded-lg  underline underline-offset-2 font-light text-zinc-400 px-2 w-[25vw]'
                                value={loginData.email}
                                autoComplete='username'
                                onChange={(e: any) => {
                                    setLoginData((loginData) => {
                                        return {
                                            ...loginData, email: e.target.value
                                        };
                                    });
                                }}
                            />
                        </fieldset>
                    </label>

                    <label className='flex flex-col gap-1'>
                        <fieldset className={`border-[1px] rounded-md px-2 py-1
                         ${response.res && (response.res.message?.includes("Password") || response.res.message?.includes("Wrong")) ? " border-red-800" : "border-zinc-800"}
                        `}>
                            <legend className='p-1 font-bold text-center text-zinc-500 '>

                                {response.res && (response.res.message?.includes("Password") || response.res.message?.includes("Wrong")) ?
                                    <p className='text-red-700'> {response.res.message}</p>
                                    : 'Password'}

                            </legend>

                            <input
                                type="password"
                                autoComplete='current-password'
                                className='outline-none bg-transparent  underline underline-offset-2 font-light text-zinc-400 px-2 w-[25vw]'
                                value={loginData.password}
                                onChange={(e: any) => {
                                    setLoginData((loginData) => {
                                        return {
                                            ...loginData, password: e.target.value
                                        };
                                    });
                                }}
                            />
                        </fieldset>
                    </label>
                    {loading ? <span className='w-[14vw] h-[6.5vh] text-center   mt-4'>Loding...</span> : <Button className="bg-slate-900 text-white text-center hover:bg-zinc-200   hover:scale-110 hover:text-slate-900 w-[14vw] mt-4 hover:border-slate-800 border-[1px]" variant={"secondary"}>login </Button>}
                </form>
                <p className='cursor-pointer'>forgot password</p>
                <span>Or</span>
                <p>Dont have an account? <strong className='cursor-pointer'>Register</strong></p>
            </div>
        </div >
    );
};

export default LoginForm;