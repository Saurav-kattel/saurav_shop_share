import React from 'react';
import NavItems from './NavItems';

const NavBar = () => {
    return (
        <div className='flex px-6  bg-white shadow-lg h-16 justify-between items-center gap-1 sticky top-0'>
            <div className="">

            </div>
            <div className='flex gap-2'>
                <NavItems name='home' link='/' />
                <NavItems name='products' link='/components/product' />
            </div>
        </div>
    );
};

export default NavBar;