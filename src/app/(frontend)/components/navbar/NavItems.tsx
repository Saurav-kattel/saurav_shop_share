"use client";
import React from 'react';
import Link from 'next/link';
const NavItems = ({ name, link }: { name: string, link: string; }) => {
    return (
        <div>
            <Link className='uppercase font-bold text-md hover:text-zinc-600 transition-all outline-none p-2 hover:border-slate-800 hover:border-b-[1px]' href={`${link}`}>{name}</Link>
        </div>
    );
};

export default NavItems;;