import { z } from "zod";
import { formatNumberWithDecimal } from "./utils";
import { PAYMENT_METHODS } from "./constants";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );

//Schema for inserting  products.

export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  slug: z.string().min(3, "Slug must be at least 3 characters."),
  category: z.string().min(3, "Category must be at least 3 characters."),
  brand: z.string().min(3, "Brand must be at least 3 characters."),
  description: z.string().min(3, "Description must be at least 3 characters."),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least 1 image."),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});

// Schema for updating products
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, "Id is required"),
});

// Schema for Signing Users in

export const signInFormSchema = z.object({
  email: z.string().email("Invalid Email Address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

/// Schema for Signing Users up

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.string().email("Invalid Email Address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

//Cart schemas

export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: currency,
});

export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: currency,
  totalPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  sessionCartId: z.string().min(1, "Session Cart Id is required"),
  userId: z.string().optional().nullable(),
});

// Schema for shipping address

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  streetAddress: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  country: z.string().min(3, "County code must be at least 3 characters"),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

// Schema for payment method
export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_METHODS.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });

//Schema for inserting order

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z
    .string()
    .refine((data) => PAYMENT_METHODS.includes(data), "Invalid payment method"),
  shippingAddress: shippingAddressSchema,
});

//Schema for inserting orderItem

export const insertOrderItemSchema = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  image: z.string().min(1),
  name: z.string().min(1),
  price: currency,
  qty: z.number(),
});

// Schema for paypal payment result

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  emailAddress: z.string(),
  pricePaid: z.string(),
});

// Schema for Update user profile

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().min(3, "Email must be at least 3 characters"),
});

// Schema for Updating user profile

export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, "id is required"),
  role: z.string().min(1, "Role is required"),
});

//Schema for insertReview

export const insertReviewSchema = z.object({
  title: z.string().min(1, "Title must be at least 3 characters"),
  description: z.string().min(1, "Description must be at least 3 characters"),
  productId: z.string().min(1, "Product is required"),
  userId: z.string().min(1, "User is required"),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be at lest 1 ")
    .max(5, "Rating must be at most 5"),
});
