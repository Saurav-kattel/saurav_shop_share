"use client";
import React, { useMemo, useState } from "react";
import { Products } from "../ProductComponent";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Sizes from "./Sizes";
import Colors from "./Colors";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { v4 } from "uuid";
import Tags from "./Tags";
import AddToCartButton from "./AddToCartButton";
import { ErrorBoundary } from "react-error-boundary";
import Error from "../../utils/Error";

export const metadata: Metadata = {
  title: "Product page",
};

const ProductPage = ({ product }: { product: Products }) => {
  const [stockState] = useState(
    product && product.quantity.length > 0 ? "In Stock" : "Out Of Stock"
  );
  const inStock = product.quantity.length > 0;
  const [disabled] = useState(stockState === "Out Of Stock");
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState({
    id: inStock ? product.quantity[0].id : null,
    size: inStock ? product.quantity[0].size : null,
  });
  const [selectedColor, setSelectedColor] = useState({
    id: inStock ? product.quantity[0].id : null,
    color: inStock ? product.quantity[0].color : null,
  });

  const [price, setPrice] = useState(
    product.quantity.find((val) => val.id === selectedSize.id)?.price
  );
  function handleCartDispatch({ product }: { product: Products }) {
    const payloadValue = {
      cartId: v4(),
      productName: product.name,
      productQuantity: 1,
      productId: product.id,
      imageUrl: product.imageUrl,
      size: selectedSize.size,
      price: price || 1,
      color: selectedColor.color,
      totalQuantity: Number(
        product.quantity.find(
          (val) =>
            val.size === selectedSize.size && val.color === selectedColor.color
        )?.total
      ),
      quantityId: selectedSize.id,
    };

    dispatch(addToCart(payloadValue));
  }
  const [colorsArray, setColorsArray] = useState(
    product.quantity.filter((items) => selectedSize.size === items.size)
  );
  useMemo(() => {
    if (colorsArray.length > 0) {
      setSelectedColor({ id: colorsArray[0].id, color: colorsArray[0].color });
    }
  }, [colorsArray]);
  return (
    <ErrorBoundary fallback={<Error />}>
      <div className="flex items-center bg-slate-800 justify-center">
        <Card className="container bg-white w-[90vw] p-2 mt-8  shadow-sm shadow-rose-400">
          <CardHeader>
            <img
              className="rounded-md w-full h-[300px] object-contain"
              src={product.imageUrl}
              width={360}
              height={360}
              alt="product image"
            />
          </CardHeader>

          <CardContent className="flex flex-col justify-center items-start gap-2">
            <CardTitle className="text-left font-bold uppercase text-rose-600 text-4xl">
              {product.name}
            </CardTitle>
            <div className="text-2xl font-semibold  text-zinc-700">
              Product Description
            </div>
            <CardDescription className="text-md">
              {product.description}
            </CardDescription>
          </CardContent>

          <CardContent>
            <p className="text-3xl text-zinc-700 ">
              Price: ${price?.toString()}
            </p>
          </CardContent>

          <CardFooter className="flex flex-col justify-start items-start gap-2">
            <div>Rating: {product.rating.rating} / 5</div>
            <div
              className={`${
                disabled ? "text-red-700" : "text-green-700"
              } text-2xl font-bold`}
            >
              {stockState}
            </div>

            <div className="">
              <Sizes
                setSelectedColor={setSelectedColor}
                colorsArray={colorsArray}
                selectedSize={selectedSize}
                quantity={product.quantity}
                setPrice={setPrice}
                setColorsArray={setColorsArray}
                setSelectedSize={setSelectedSize}
              />
              <Tags tags={product.tags} />
              <Colors
                selectedColor={selectedColor}
                quantity={colorsArray}
                setSelectedColor={setSelectedColor}
              />
            </div>
            <AddToCartButton
              disabled={disabled}
              product={product}
              handleCartDispatch={handleCartDispatch}
            />
          </CardFooter>
        </Card>
      </div>
    </ErrorBoundary>
  );
};

export default ProductPage;
