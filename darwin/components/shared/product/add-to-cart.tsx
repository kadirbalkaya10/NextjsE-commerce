"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Cart, CartItem } from "@/types";
import { Plus, Minus, Loader } from "lucide-react";
import { toast } from "sonner";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart-action";
import { useTransition } from "react";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const [isPending, starTransition] = useTransition();

  const handleAddToCart = async () => {
    starTransition(async () => {
      const response = await addItemToCart(item);

      if (!response.success) {
        toast.error("We could not add to cart", {
          description: response.message,
          richColors: true,
        });
        return;
      }
      // Handle success add to cart
      toast.success("", {
        description: response.message,
        richColors: true,

        action: {
          label: "Go To Cart",
          onClick: () => {
            router.push("/cart");
          },
        },
      });
    });
  };

  // Handle remove item from cart
  const handleRemoveFromCart = async () => {
    starTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (res.success) {
        toast.success("", { description: res.message });
      } else {
        toast.warning("", { description: res.message });
      }
      return;
    });
  };

  //Check if item is in cart

  const existItem = cart?.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Minus className='h-4 w-4' />
        )}
      </Button>
      <span className='px-2'>{existItem.qty}</span>
      <Button type='button' variant='outline' onClick={handleAddToCart}>
        {isPending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Plus className='h-4 w-4' />
        )}
      </Button>
    </div>
  ) : (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='h-4 w-4' />
      )}{" "}
      Add To Cart
    </Button>
  );
};

export default AddToCart;
