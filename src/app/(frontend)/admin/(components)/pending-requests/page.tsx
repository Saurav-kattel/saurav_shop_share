import { cookies } from 'next/headers';
import React from 'react';
import RequestsComponents from './RequestsComponents';
import { Metadata } from 'next';
async function getData(auth: string) {
    let res = await fetch(process.env.BASE_URL + "/api/admin/get-pending-purchase-request", {
        method: "GET",
        headers: {
            auth
        },
        cache: "no-store"
    });
    return await res.json();
}

export const metadata: Metadata = {
    title: "Admin - Pending Requests",
    description: "Admin page for saurav shop"
};
const page = async () => {
    const cookie = cookies().get("auth")?.value ?? '';
    const data = await getData(cookie);
    if (data.res && data.res.data) {
        return (
            <div className='flex flex-col bg-slate-900 items-center justify-center'>
                <RequestsComponents data={data.res.data} />
            </div>
        );
    }
    return <div>Error loading page</div>;
};

export default page;