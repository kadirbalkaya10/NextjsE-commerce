import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart-action";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/");

  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("No user id");
  const user = await getUserById(userId);

  return <>Address</>;
};

export default ShippingAddressPage;
