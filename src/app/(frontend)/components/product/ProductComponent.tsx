"use client";
import React, { Suspense, useEffect, useRef } from "react";
import CardComponent from "./Card";
import Loading from "@/app/services/utils/Loading";
export type Products = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  ratingId: string;
  category: string[];
  rating: {
    id: string;
    rating: string;
  };
  tags: string[];
  quantity: {
    id: string;
    color: string;
    size: string;
    total: string;
    productId: string;
    price: number;
  }[];
};

const ProductComponent = ({ products }: { products: Products[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.classList.add("animation");

    () => {
      ref.current?.classList.remove("animation");
    };
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <div className="h-[100vh] overflow-y-hidden">
        <div
          ref={ref}
          className="flex flex-wrap gap-14  translate-y-full  bg-slate-800 p-4  h-[100v] overflow-y-scroll  hide-scroll scroll-smooth animation  justify-center items-center"
        >
          {products.map((product) => {
            return (
              <div key={product.id}>
                <CardComponent products={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Suspense>
  );
};

export default ProductComponent;
