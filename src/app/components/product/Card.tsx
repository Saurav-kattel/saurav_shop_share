"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import React from 'react';
import { Products } from "./ProductPage";


const CardComponent = ({ products }: { products: Products; }) => {
    return (
        <Card className="container w-[40vw] p-0">
            <CardHeader>
                <CardTitle className="text-left font-bold text-3xl">{products.name}</CardTitle>
                <CardDescription>{products.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center items-center">
                <img className="rounded-md w-[300px] h-[300px] object-contain" src={products.imageUrl} width={360} height={360} alt="product image" />
            </CardContent>
            <CardContent>
                {products.price}
            </CardContent>
            <CardFooter>
                <p>Rating: {products.rating.rating} / 5</p>
            </CardFooter>
        </Card>
    );
};

export default CardComponent

