import React from 'react';
import SideBar from './(components)/navigation/SideBar';
import { Metadata } from 'next';

const AdminLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div className='flex w-[100vw] absolute'>
            <SideBar />
            <div className='w-[80vw]'>{children}</div>
        </div>
    );
};

export default AdminLayout;