import Link from 'next/link';
import React from 'react';

const page = () => {
    return (
        <>
            <div>
                <Link href={'/admin/dashboard'} >dashboard </Link>
            </div>

        </>
    );
};

export default page;