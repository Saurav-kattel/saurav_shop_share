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
        <Card className="container w-[40vw]">
            <CardHeader>
                <CardTitle>{products.name}</CardTitle>
                <CardDescription>{products.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <img src={products.imageUrl} alt="product image" />
            </CardContent>
            <CardFooter>
                <p>{products.rating.rating}</p>
            </CardFooter>
        </Card>
    );
};

export default CardComponent

