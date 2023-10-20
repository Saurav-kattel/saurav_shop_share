"use client";
import React from 'react';
import NavItems from './NavItems';
import Cart from '../cart/Cart';
import { Provider } from 'react-redux';
import store from '@/redux/app/store';

const NavBar = () => {
    return (
        <div className='flex px-6  bg-white shadow-lg h-16 justify-between items-center gap-1 sticky top-0'>
            <div className="">

            </div>
            <div className='flex gap-2'>
                <NavItems name='home' link='/' />
                <NavItems name='products' link='/components/product' />
                <Provider store={store}>
                    <Cart />
                </Provider>

            </div>
        </div>
    );
};

export default NavBar;