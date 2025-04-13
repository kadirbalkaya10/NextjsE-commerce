const StripePayment = ({
  priceInCents,
  orderId,
  client_secret,
}: {
  priceInCents: number;
  orderId: string;
  client_secret: string;
}) => {
  return <>Stripe Form</>;
};

export default StripePayment;
