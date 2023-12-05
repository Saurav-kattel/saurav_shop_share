import { Button } from "@/components/ui/button";
import React from "react";

const AddToCartButton = ({
  product,
  disabled,
  handleCartDispatch,
}: {
  product: any;
  disabled: boolean;
  handleCartDispatch: Function;
}) => {
  return (
    <Button
      className="bg-slate-900 border-none text-white text-center hover:bg-white  hover:scale-110 hover:text-slate-900 hover:border-slate-800 border-[1px]"
      disabled={disabled}
      onClick={() => handleCartDispatch({ product })}
      variant={"secondary"}
    >
      Add to cart{" "}
    </Button>
  );
};

export default AddToCartButton;
