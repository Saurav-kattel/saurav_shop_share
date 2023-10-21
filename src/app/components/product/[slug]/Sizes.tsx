import React, { SetStateAction } from 'react';
import { Products } from '../ProductComponent';

const Sizes = ({ quantity, setSelectedSize, setPrice, setColorsArray }: { quantity: Products["quantity"]; setSelectedSize: React.Dispatch<SetStateAction<{ id: string, size: string; }>>; setPrice: React.Dispatch<SetStateAction<any>>; setColorsArray: React.Dispatch<SetStateAction<any>>; }) => {

    function removeDuplicateSize({ products }: { products: Products["quantity"]; }) {
        let sizeToMatch = "M";

        let filteredProducts: Products["quantity"] = [];
        let sizeMatched = false;

        products.forEach(product => {
            if (product.size === sizeToMatch && !sizeMatched) {
                filteredProducts.push(product);
                sizeMatched = true;
            } else if (product.size !== sizeToMatch) {
                filteredProducts.push(product);
            }
        });

        return filteredProducts;
    }
    return (
        <div className='flex gap-1 items-center'>{
            removeDuplicateSize({ products: quantity }).map((elem) => {
                return <div key={elem.id} className='p-[2px] rounded-sm hover:scale-110 border-zinc-400 border-[1px]'>
                    <button
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
};

export default Sizes;;