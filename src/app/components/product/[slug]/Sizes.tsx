import React, { SetStateAction } from 'react';
type Size = {
    id: string;
    name: string;
    productId: string;
};
const Sizes = ({ size, setSelectedSize }: { size: Size[]; setSelectedSize: React.Dispatch<SetStateAction<string>>; }) => {
    return (
        <div className='flex gap-1 items-center'>{size.map((elem) => {
            return <div key={elem.id} className='p-[2px] rounded-sm hover:scale-110 border-zinc-400 border-[1px]'>
                <button
                    onClick={() => {
                        setSelectedSize(elem.name);
                    }}
                >{elem.name}</button>
            </div>;
        })}</div>
    );
};

export default Sizes;