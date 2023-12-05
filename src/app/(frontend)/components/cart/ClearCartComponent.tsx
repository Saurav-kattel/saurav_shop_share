"use client";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/redux/features/cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ClearCartComponent = ({ cartItem }: { cartItem: any }) => {
  const dispatch = useDispatch();
  if (cartItem.length) {
    return (
      <div>
        <Button
          className="text-white text-center  hover:bg-transparent  hover:border-[1px]  hover:scale-110 hover:text-white-900 hover:border-rose-500 mx-4"
          variant={"destructive"}
          onClick={() => {
            dispatch(clearCart());
          }}
        >
          ClearCart
        </Button>
      </div>
    );
  }
  return null;
};

export default ClearCartComponent;
