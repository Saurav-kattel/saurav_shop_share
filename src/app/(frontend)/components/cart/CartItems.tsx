import React from "react";
import { useDispatch } from "react-redux";
type Items = {
  productId: string;
  price: number;
  color: string;
  size: string;
  imageUrl: string;
  productName: string;
  productQuantity: number;
  cartId: string;
  totalQuantity: number;
  quantityId: string;
};

const CartItems = ({
  cartItem,
  handleIncreaseDispatch,
  handleDecreaseDispatch,
}: {
  cartItem: any;
  handleIncreaseDispatch: Function;
  handleDecreaseDispatch: Function;
}) => {
  const dispatch = useDispatch();
  return (
    <div className="">
      {cartItem.map((items: Items, idx: number) => {
        return (
          <div key={idx} className="flex gap-4 p-4 w-[33vw] items-center">
            <img
              className="rounded-sm w-[60px] h-[40px]"
              src={items.imageUrl}
              width={60}
              height={60}
              alt={items.productName}
            />
            <p className="text-lg font-bold flex flex-wrap text-zinc-400">
              {items.productName} ({items.color}) ({items.size})
            </p>
            <p className="text-zinc-400 text-xl">${items.price}</p>
            <div
              className="text-rose-500 select-none   bg-slate-600 w-[25px] flex  p-0  items-center justify-center cursor-pointer h-[25px] hover:scale-105 rounded-full "
              onClick={() =>
                handleIncreaseDispatch({ product: items, dispatch: dispatch })
              }
            >
              +
            </div>
            <p className="text-zinc-400 text-lg ">{items.productQuantity}</p>
            <div
              className="text-rose-500 select-none bg-slate-600 w-[25px] flex  p-0  items-center justify-center cursor-pointer h-[25px] hover:scale-105 rounded-full "
              onClick={() =>
                handleDecreaseDispatch({ product: items, dispatch: dispatch })
              }
            >
              -
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItems;
