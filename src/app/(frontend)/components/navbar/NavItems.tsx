"use client";
import React from 'react';
import Link from 'next/link';
const NavItems = ({ name, link }: { name: string, link: string; }) => {
    return (
        <div>
            <Link className='uppercase border-transparent font-bold text-white text-md hover:text-rose-400 transition-colors outline-none  p-2 ease-out duration-75 hover:border-rose-400 hover:border-b-[1px]' href={`${link}`}>{name}</Link>
        </div>
    );
};

export default NavItems;;