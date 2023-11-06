import React, { SetStateAction } from 'react';
import { Products } from '../ProductComponent';
import { removeDuplicateSize } from '@/app/services/components/product/removeDuplicateSize';

const Sizes = ({
    quantity,
    setSelectedSize,
    selectedSize,
    setPrice,
    setColorsArray,
    setSelectedColor,
    colorsArray
}: {
    quantity: Products["quantity"];
    setSelectedSize: React.Dispatch<SetStateAction<{ id: string | null, size: string | null; }>>;
    setSelectedColor: React.Dispatch<SetStateAction<{ id: string | null, color: string | null; }>>;
    setPrice: React.Dispatch<SetStateAction<any>>;
    setColorsArray: React.Dispatch<SetStateAction<any>>;
    colorsArray: any[];
    selectedSize: { id: string | null, size: string | null; };
}) => {

    if (selectedSize.size !== null) {
        return (
            <div className='flex gap-1 items-center'>{
                removeDuplicateSize({ products: quantity }).map((elem) => {
                    return <div key={elem.id} >
                        <button
                            className={` flex justify-center items-center hover:scale-110 hover:shadow-inner hover:shadow-rose-400 hover:border-rose-400  w-8 h-8 rounded-md ${selectedSize.size === elem.size ? "border-rose-400 scale-110 shadow shadow-rose-400" : null} hover:scale-110 border-[1px] mx-1 border-slate-300 `}
                            onClick={() => {
                                setSelectedSize({
                                    size: elem.size,
                                    id: elem.id
                                });
                                setPrice(elem.price);
                                setColorsArray(quantity.filter((items) => elem.size === items.size));
                            }}
                        >{elem.size}</button>
                    </div>;
                })}</div>
        );
    }
    return null;
};

export default Sizes;