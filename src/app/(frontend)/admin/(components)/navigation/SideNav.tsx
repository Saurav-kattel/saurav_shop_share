'use client';
import React from 'react';
import SideNavItems from './SideNavItems';
import { useSelector } from 'react-redux';
const SideNav = () => {
    const username = useSelector((state: any) => state.admin.username);
    return (
        <div className='w-[20vw] flex flex-col items-center sticky top-0 h-[100vh] py-5 px-2'>
            <h2 className='underline uppercase  underline-offset-4 p-2 text-rose-500 text-center'><span className='text-2xl '>admin</span> </h2>
            <span className=' underline  text-rose-500 underline-offset-4 text-right w-[19vw]   text-sm'>{username}</span>
            <div className='mt-6  flex flex-col gap-2'>
                <SideNavItems name='home' links='/admin/dashboard' />
                <SideNavItems name='Pending Requests' links='/admin/pending-requests' />
            </div>
        </div>
    );
};

export default SideNav;