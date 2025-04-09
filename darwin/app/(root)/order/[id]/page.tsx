import { Metadata } from "next";
import { getOrderById } from "@/lib/actions/order-actions";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Order Details",
};
const OrderDetailPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = getOrderById(id);
  if (!order) notFound();

  return <>Order Detail</>;
};

export default OrderDetailPage;
