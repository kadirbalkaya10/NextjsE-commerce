"use server";

import { CartItem } from "@/types";

export async function addItemToCart(data: CartItem) {
  console.log(data);
  return {
    success: true,
    message: "Item added to cart",
  };
}
