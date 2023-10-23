"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { Products } from "./ProductComponent";
import Link from "next/link";
import ShowSizes from "./ShowSizes";
import ShowColors from "./ShowColors";


const CardComponent = ({ products }: { products: Products; }) => {
    const [stockState] = useState(products.quantity.length > 0 ? "In Stock" : "Out Of Stock");
    const [disabled] = useState(stockState === "Out Of Stock");

    return (
        <Card className="container w-[40vw] p-0  shadow-md">
            <Link href={"/components/product/" + products.id}>

                <CardHeader>
                    <CardTitle className="text-left font-bold text-3xl">{products.name}</CardTitle>
                    <div className="text-2xl text-zinc-700">Product Description</div>
                    <CardDescription>
                        {products.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-center flex-col items-center">
                    <img className="rounded-md w-[300px] h-[300px] object-contain" src={products.imageUrl} width={360} height={360} alt="product image" />
                </CardContent>


                <CardFooter className="flex flex-col justify-start items-start">
                    <div> Price:  $ {products.quantity[0].price.toString()} </div>
                    <ShowSizes products={products} />
                    <ShowColors products={products} />
                    <div>Rating: {products.rating.rating} / 5</div>
                    <div>{stockState}</div>
                </CardFooter>

            </Link>

            <CardFooter className="flex flex-col justify-start items-start">
                <Button className="bg-slate-900 text-white text-center hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800 border-[1px]"
                    disabled={disabled}
                    variant={"secondary"}>Add to cart </Button>
            </CardFooter>

        </Card >

    );
};

export default CardComponent

