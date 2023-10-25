import { provinces } from '@/app/services/components/checkout/provinces';
import { ZipCodes } from '@/app/services/components/checkout/zipcode';
import React, { SetStateAction } from 'react';

const CheckOutForm = ({ userData, setUserData, showError, setShowError }: {
    userData: {
        userEmail: string;
        firstname: string;
        lastname: string;
        zipcode: string;
        province: string;
        phoneNumber: string;
    };
    setUserData: React.Dispatch<SetStateAction<{
        userEmail: string;
        firstname: string;
        lastname: string;
        zipcode: string;
        province: string;
        phoneNumber: string;
    }>>;
    showError: {
        showError: boolean;
        errors: Record<string, { message: string; }>;
    };
    setShowError: React.Dispatch<SetStateAction<typeof showError>>;
}) => {

    const selcetedProvince: string = ZipCodes[userData.province];
    return (
        <div>
            <form className='flex flex-col w-[35vw] border-r-[1px]  border-zinc-300'  >
                <h2 className='text-center text-2xl font-bold uppercase p-4 text-zinc-600'>
                    Your Details
                </h2>
                <div className='p-4'>

                    <label className="flex justify-center  flex-col gap-1">
                        <span className=' font-bold uppercase text-zinc-600'>FirstName</span>
                        <input type="text"
                            className={`outline-none border-b-[1px] ${showError.errors.hasOwnProperty("firstname") ?
                                " border-red-600" : "border-slate-600"}`}
                            name='lastname'
                            value={userData.firstname}
                            onChange={(e) => {
                                setUserData((userData) => {
                                    return { ...userData, firstname: e.target.value };
                                });
                            }} />
                        <span className='text-red-600'>{showError.errors.hasOwnProperty("firstname") ? showError.errors.firstname.message : null}</span>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className=' font-bold uppercase text-zinc-600'>LastName</span>
                        <input type="text"
                            className={`outline-none border-b-[1px] ${showError.errors.hasOwnProperty("lastname") ?
                                " border-red-600" : "border-slate-600"}`}
                            name='firstname'
                            value={userData.lastname}
                            onChange={(e) => {
                                setUserData((userData) => {
                                    return { ...userData, lastname: e.target.value };
                                });
                            }} />
                        <span className='text-red-600'>{showError.errors.hasOwnProperty("lastname") ? showError.errors.lastname.message : null}</span>
                    </label>
                    <label className="flex flex-col gap-1">
                        <span className=' font-bold uppercase text-zinc-600'>Email</span>
                        <input type="email"
                            className={`outline-none border-b-[1px] ${showError.errors.hasOwnProperty("email") ?
                                " border-red-600" : "border-slate-600"}`}
                            name='email'
                            value={userData.userEmail}
                            onChange={(e) => {
                                setUserData((userData) => {
                                    return { ...userData, userEmail: e.target.value };
                                });
                            }} />

                        <span className='text-red-600'>{showError.errors.hasOwnProperty("userEmail") ? showError.errors.userEmail.message : null}</span>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className=' font-bold uppercase text-zinc-600'>Province</span>
                        <select name="province"
                            className='outline-none border-b-[1px] border-slate-600'
                            onChange={(e) => {
                                setUserData((userData) => {
                                    return { ...userData, province: e.target.value };
                                });
                            }}
                        >
                            {Object.keys(provinces).map((codes) => {
                                return <option className='outline-none border-b-[1px] border-slate-600' key={codes} value={codes}>{codes}</option>;
                            })}
                        </select>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className=' font-bold uppercase text-zinc-600'> District</span>
                        <select name="zipCode"
                            className='outline-none border-b-[1px] border-slate-600'
                            onChange={(e) => {
                                setUserData((userData) => {
                                    return { ...userData, zipcode: e.target.value };
                                });
                            }}
                        >
                            {Object.keys(selcetedProvince).map((codes) => {
                                return <option className='outline-none border-b-[1px] border-slate-600' key={codes} value={codes}>{codes}</option>;
                            })}
                        </select>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className=' font-bold uppercase text-zinc-600'>PhoneNumber</span>
                        <input type="number"
                            className={`outline-none border-b-[1px] ${showError.errors.hasOwnProperty("phoneNumber") ?
                                " border-red-600" : "border-slate-600"}`}
                            maxLength={10}
                            minLength={10}
                            name='phonenumber'
                            value={userData.phoneNumber}
                            onChange={(e) => {
                                setUserData((userData) => {
                                    return { ...userData, phoneNumber: e.target.value };
                                });
                            }} />
                        <span className='text-red-600'>{showError.errors.hasOwnProperty("phoneNumber") ? showError.errors.phoneNumber.message : null}</span>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default CheckOutForm;