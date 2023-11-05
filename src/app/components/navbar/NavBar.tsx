"use client";
import React, { useMemo, useState } from 'react';
import NavItems from './NavItems';
import Cart from '../cart/Cart';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/redux/app/store';
import { isLoggedIn } from '@/app/services/components/user/isLoggedIn';
import { useCookies } from 'next-client-cookies';
import { checkIsAdmin } from '@/redux/features/admin/adminSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
const NavBar = () => {
    const loggedIn = isLoggedIn();
    const cookies = useCookies();
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const isAdmin = useSelector((state: any) => state.admin.isAdmin);
    useMemo(() => {
        dispatch(checkIsAdmin(cookies.get("auth") || ''));
    }, []);
    return (
        <div className='flex z-10    px-6  bg-white shadow-lg h-16 justify-between items-center gap-1 sticky top-0'>
            <div className=""></div>
            <div className='flex gap-2'>
                <NavItems name='home' link='/' />
                <NavItems name='products' link='/components/product' />
                {isAdmin ? <NavItems name='requestProducts' link='/components/admin/dashboard/purchase-requests' /> : null}
                {!loggedIn ? <NavItems name='login or register' link='/components/user/login' /> : null}
                <Provider store={store}>
                    <Cart />
                </Provider>
            </div>
        </div>
    );
};

export default NavBar;