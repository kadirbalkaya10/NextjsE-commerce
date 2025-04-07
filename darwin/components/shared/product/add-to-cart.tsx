"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";
import { Plus } from "lucide-react";
import { toast, Toaster } from "sonner";
import { addItemToCart } from "@/lib/actions/cart-action";

const AddToCart = ({ item }: { item: CartItem }) => {
  const router = useRouter();

  const handleAddToCart = async () => {
    const response = await addItemToCart(item);

    if (!response.success) {
      toast("We Could Not Add To Cart", {
        description: response.message,
      });
      return;
    }
    // Handle success add to cart
    toast.success("", {
      description: `${item.name} added to cart`,
      style: { backgroundColor: "bg-green-500", color: "green" },
      action: {
        label: "Go To Cart",
        onClick: () => {
          router.push("/cart");
        },
      },
    });
  };

  return (
    <Button className='w-full' type='button' onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
