import { provinces } from '@/app/services/components/checkout/provinces';
import { ZipCodes } from '@/app/services/components/checkout/zipcode';
import React, { SetStateAction } from 'react';

const CheckOutForm = ({ formData, setFormData }: {
    formData: {
        userEmail: string;
        firstname: string;
        lastname: string;
        zipcode: string;
        province: string;
        phoneNumber: string;
    };
    setFormData: React.Dispatch<SetStateAction<{
        userEmail: string;
        firstname: string;
        lastname: string;
        zipcode: string;
        province: string;
        phoneNumber: string;
    }>>;
}) => {
    const selcetedprovince: string = ZipCodes[formData.province];
    return (

        <form className='flex flex-col w-[35vw] border-r-[1px] border-zinc-300'  >
            <h2 className='text-center text-2xl font-bold uppercase p-4 text-zinc-600'>
                Your Details
            </h2>
            <div className='p-4'>

                <label className="flex justify-center  flex-col gap-1">
                    <span className=' font-bold uppercase text-zinc-600'>FirstName</span>
                    <input type="text"
                        className='outline-none border-b-[1px] border-slate-600'
                        name='lastname'
                        value={formData.firstname}
                        onChange={(e) => {
                            setFormData((formData) => {
                                return { ...formData, firstname: e.target.value };
                            });
                        }} />
                </label>
                <label className="flex flex-col gap-1">
                    <span className=' font-bold uppercase text-zinc-600'>LastName</span>
                    <input type="text"
                        className='outline-none border-b-[1px] border-slate-600'
                        name='firstname'
                        value={formData.lastname}
                        onChange={(e) => {
                            setFormData((formData) => {
                                return { ...formData, lastname: e.target.value };
                            });
                        }} />
                </label>
                <label className="flex flex-col gap-1">
                    <span className=' font-bold uppercase text-zinc-600'>Email</span>
                    <input type="email"
                        className='outline-none border-b-[1px] border-slate-600'
                        name='email'
                        value={formData.userEmail}
                        onChange={(e) => {
                            setFormData((formData) => {
                                return { ...formData, userEmail: e.target.value };
                            });
                        }} />
                </label>

                <label className="flex flex-col gap-1">
                    <span className=' font-bold uppercase text-zinc-600'>Province</span>
                    <select name="province"
                        className='outline-none border-b-[1px] border-slate-600'
                        onChange={(e) => {
                            setFormData((formData) => {
                                return { ...formData, province: e.target.value };
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
                            setFormData((formData) => {
                                return { ...formData, zipcode: e.target.value };
                            });
                        }}
                    >
                        {Object.keys(selcetedprovince).map((codes) => {
                            return <option className='outline-none border-b-[1px] border-slate-600' key={codes} value={codes}>{codes}</option>;
                        })}
                    </select>
                </label>

                <label className="flex flex-col gap-1">
                    <span className=' font-bold uppercase text-zinc-600'>PhoneNumber</span>
                    <input type="number"
                        className='outline-none border-b-[1px] border-slate-600'
                        maxLength={10}
                        minLength={10}
                        name='phonenumber'
                        value={formData.phoneNumber}
                        onChange={(e) => {
                            setFormData((formData) => {
                                return { ...formData, phoneNumber: e.target.value };
                            });
                        }} />
                </label>
            </div>
        </form>

    );
};

export default CheckOutForm;