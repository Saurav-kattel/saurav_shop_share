"use client";
import React, { useState } from 'react';
import { Products } from '../ProductComponent';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Metadata } from 'next';
import Sizes from './Sizes';
import Colors from './Colors';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { v4 } from 'uuid';

export const metadata: Metadata = {
    title: "Product page"
};

const ProductPage = ({ product }: { product: Products; }) => {




    const [stockState] = useState(product && product.quantity.length > 0 ? "In Stock" : "Out Of Stock");
    const [disabled] = useState(stockState === "Out Of Stock");
    const sizeLen = product && product.size.length > 0;
    const colorLen = product.colors && product.colors.length > 0;
    const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("white");

    function handleCartDispatch({ product }: { product: Products; }) {
        const payloadValue = {
            cartId: v4(),
            price: product.price,
            productName: product.name,
            productQuantity: 1,
            productId: product.id,
            imageUrl: product.imageUrl,
            size: selectedSize,
            color: selectedColor
        };

        dispatch(addToCart(payloadValue));

    }

    return (

        <div className='flex items-center justify-center'>
            <Card className="container w-[90vw] p-2 m-2  shadow-md">
                <CardHeader>
                    <CardTitle className="text-left font-bold text-3xl">{product.name}</CardTitle>
                    <div className="text-2xl text-zinc-700">Product Description</div>
                    <CardDescription className='text-md'>
                        {product.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-center items-center">
                    <img className="rounded-md w-[500px] h-[300px] object-contain" src={product.imageUrl} width={360} height={360} alt="product image" />
                </CardContent>
                <div>

                </div>
                <CardContent>
                    <p className='text-3xl text-zinc-700 '>Price:  $ {product.price}</p>
                </CardContent>
                <CardFooter className="flex flex-col justify-start items-start gap-2">
                    <div>Rating: {product.rating.rating} / 5</div>
                    <div className={`${disabled ? "text-red-700" : "text-green-700"} text-2xl font-bold`}>{stockState}</div>
                    {colorLen ? <div className=''>
                        <h4 className='text-2xl text-zinc-800 '>Colors:</h4>
                        <Colors colors={product.colors} setSelectedColor={setSelectedColor} />
                    </div> : null}

                    {sizeLen ? <div className=""> <h4 className='text-2xl text-zinc-800 '>Sizes:</h4>
                        < Sizes size={product.size} setSelectedSize={setSelectedSize} />
                    </div>
                        : null}


                    <Button className="bg-slate-900 text-white text-center hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800 border-[1px]"
                        disabled={disabled}
                        onClick={() => handleCartDispatch({ product })}
                        variant={"secondary"}>Add to cart </Button>
                </CardFooter>

            </Card></div>
    );
};

export default ProductPage;;