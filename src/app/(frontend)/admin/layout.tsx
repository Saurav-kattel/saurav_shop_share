import React from 'react';
import SideBar from './(components)/navigation/SideBar';
const AdminLayout = ({ children }: { children: React.ReactNode; }) => {
    return (
        <div>
            <SideBar />
            {children}
        </div>
    );
};

export default AdminLayout;