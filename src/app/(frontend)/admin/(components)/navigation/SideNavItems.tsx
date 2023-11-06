import Link from 'next/link';
import React from 'react';

const SideNavItems = ({ links, name }: { links: string, name: string; }) => {
    return (

        <Link className=' hover:text-rose-400 font-bold uppercase p-2 w-[20vw] text-white shadow-inner shadow-slate-700 rounded-lg text-center' href={links}>{name}</Link>

    );
};

export default SideNavItems;