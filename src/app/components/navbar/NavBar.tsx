"use client";
import React from 'react';
import NavItems from './NavItems';
import Cart from '../cart/Cart';
import { Provider } from 'react-redux';
import store from '@/redux/app/store';
import { isLoggedIn } from '@/app/services/components/user/isLoggedIn';
const NavBar = () => {
    const loggedIn = isLoggedIn();
    return (
        <div className='flex z-10    px-6  bg-white shadow-lg h-16 justify-between items-center gap-1 sticky top-0'>
            <div className=""></div>
            <div className='flex gap-2'>
                <NavItems name='home' link='/' />
                <NavItems name='products' link='/components/product' />
                <NavItems name='requestProducts' link='/components/admin/dashboard/purchase-requests' />
                {!loggedIn ? <NavItems name='login or register' link='/components/user/login' /> : null}
                <Provider store={store}>
                    <Cart />
                </Provider>

            </div>
        </div>
    );
};

export default NavBar;