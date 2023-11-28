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
import React, { Suspense, useState } from "react";
import { Products } from "./ProductComponent";
import Link from "next/link";
import Loading from "@/app/services/utils/Loading";

const CardComponent = ({ products }: { products: Products }) => {
  type StockType = "InStock" | "OutOfStock";
  const [stockState] = useState<StockType>(
    products.quantity.length > 0 ? "InStock" : "OutOfStock"
  );
  const [disabled] = useState(stockState === "OutOfStock");

  return (
    <Suspense fallback={<Loading />}>
      <Card className="container font-semibold text-slate-600 w-[15vw] p-0 h-[75vh] shadow-sm border-[1px] border-spacing-0 border-rose-400 shadow-rose-400">
        <Link href={"/components/product/" + products.id}>
          <CardHeader>
            <img
              className="rounded-md object-contain h-[28vh] w-[20vw]"
              src={products.imageUrl}
              alt="product_image"
            />
          </CardHeader>

          <CardContent className="flex justify-center flex-col items-center">
            <div className="bg-slate-200 w-[12vw]  py-4  rounded-lg px-3">
              <CardTitle className="text-left text-rose-500 capitalize  mb-2  font-bold text-3xl">
                {products.name}
              </CardTitle>

              <div>
                Price: $
                <span className="text-green-700">
                  {products.quantity.length
                    ? products.quantity[0].price.toString()
                    : "xx.xx"}
                </span>
              </div>
              <div>Rating: {products.rating.rating} / 5</div>
              <div>
                <div
                  className={`${
                    stockState === "OutOfStock"
                      ? "text-red-600 border-red-600"
                      : "text-green-700 border-green-700"
                  }  py-1 px-2 mt-2 border-[1px]  text-center w-[8vw] rounded-lg`}
                >
                  {stockState}
                </div>
              </div>
            </div>
          </CardContent>
        </Link>

        <CardFooter className="flex flex-col  justify-end items-start">
          {disabled ? null : (
            <Button
              className="bg-rose-600   text-white text-center hover:bg-white  hover:scale-110 hover:text-rose-600 hover:border-rose-600 border-[1px]"
              disabled={disabled}
              variant={"secondary"}
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </Suspense>
  );
};

export default CardComponent;
