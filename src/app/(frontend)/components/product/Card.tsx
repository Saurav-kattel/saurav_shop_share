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
        <Card className="container w-[20vw] h-[90vh] p-0 shadow-sm shadow-rose-700">
            <Link href={"/components/product/" + products.id}>

                <CardHeader>
                    <CardTitle className="text-left font-bold text-3xl">{products.name}</CardTitle>
                    <div className="text-2xl text-zinc-700">Product Description</div>
                    <CardDescription>
                        {products.description.slice(0, 60)}...
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex justify-center flex-col items-center">
                    <img className="rounded-md object-contain h-[20vh] w-[30vw]" src={products.imageUrl} alt="product image" />
                </CardContent>


                <CardFooter className="flex flex-col justify-between items-start h-[25vh]">
                    <div> Price:  $ {products.quantity.length ? products.quantity[0].price.toString() : "$XX.XX"} </div>
                    <ShowSizes products={products} />
                    <ShowColors products={products} />
                    <div>Rating: {products.rating.rating} / 5</div>
                    <div>{stockState}</div>
                </CardFooter>

            </Link>

            <CardFooter className="flex flex-col  justify-end items-start">
                <Button className="bg-slate-900   text-white text-center hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800 border-[1px]"
                    disabled={disabled}
                    variant={"secondary"}>Add to cart </Button>
            </CardFooter>

        </Card >

    );
};

export default CardComponent

