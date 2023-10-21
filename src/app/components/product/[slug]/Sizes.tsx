import React, { SetStateAction } from 'react';
import { Products } from '../ProductComponent';

const Sizes = ({ quantity, setSelectedSize }: { quantity: Products["quantity"]; setSelectedSize: React.Dispatch<SetStateAction<string>>; }) => {
    return (
        <div className='flex gap-1 items-center'>{quantity.map((elem) => {
            return <div key={elem.id} className='p-[2px] rounded-sm hover:scale-110 border-zinc-400 border-[1px]'>
                <button
                    onClick={() => {
                        setSelectedSize(elem.size);
                    }}
                >{elem.size}</button>
            </div>;
        })}</div>
    );
};

export default Sizes;