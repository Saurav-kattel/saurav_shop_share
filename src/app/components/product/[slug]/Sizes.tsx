import React from 'react';
type Size = {
    id: string;
    name: string;
    productId: string;
};
const Sizes = ({ size }: { size: Size[]; }) => {
    return (
        <div className='flex gap-1 items-center'>{size.map((elem) => {
            return <div key={elem.id} className='p-[2px] rounded-sm hover:scale-110 border-zinc-400 border-[1px]'>
                <button>{elem.name}</button>
            </div>;
        })}</div>
    );
};

export default Sizes;