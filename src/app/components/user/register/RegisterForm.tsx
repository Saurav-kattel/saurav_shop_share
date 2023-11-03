"use client";
import { handleRegister } from '@/app/services/components/user/handleRegister';
import React, { useState } from 'react';

export type RegisterData = { username: string, email: string, password: string, confirmPassword: string; };
export type Response = { res: { message?: string, success?: boolean; validationError?: { field: string, message: string; }[]; }; };
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
            success: undefined,
            validationError: undefined
        }
    });
    const [loading, setLoading] = useState(false);
    console.log(registerData);
    return (
        <div>
            <form onSubmit={async (e) => {
                await handleRegister({ e, setLoading, registerData, setResponse, setRegisterData });
            }}>
                <label>
                    <fieldset>
                        <legend>Username</legend>
                    </fieldset>
                    <input
                        type="text"
                        value={registerData.username}
                        onChange={(e) => {
                            setRegisterData((registerData => {
                                return { ...registerData, username: e.target.value };
                            }));
                        }}
                    />
                </label>
                <label>
                    <fieldset>
                        <legend>Email</legend>
                    </fieldset>
                    <input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => {
                            setRegisterData((registerData => {
                                return { ...registerData, email: e.target.value };
                            }));
                        }}
                    />
                </label>
                <label>
                    <fieldset>
                        <legend>Password</legend>
                    </fieldset>
                    <input
                        type="password"
                        value={registerData.password}
                        onChange={(e) => {
                            setRegisterData((registerData => {
                                return { ...registerData, password: e.target.value };
                            }));
                        }}
                    />
                </label>
                <label>
                    <fieldset>
                        <legend>Confirm Password</legend>
                    </fieldset>
                    <input
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => {
                            setRegisterData((registerData => {
                                return { ...registerData, confirmPassword: e.target.value };
                            }));
                        }}
                    />
                </label>
                <div className="">
                    <button type='submit'>register</button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;