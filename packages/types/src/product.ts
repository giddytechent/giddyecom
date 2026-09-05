import type { Product, Category } from "@repo/product-db"
import z from "zod"

export type ProductType = Product

export type ProductsType = ProductType[]


export type StripeProductType = {
  id: string
  name: string
  price: number
}

export type CategoryType = Category

export const CategoryFormSchema = z.object({
  name: z
    .string({ message: "Name is Required!" })
    .min(1, { message: "Name is Required!" }),
  slug: z
    .string({ message: "Slug is Required!" })
    .min(1, { message: "Slug is Required!" }),
});


export const colors = [
  "blue", "green", "red", "yellow", "purple", "orange",
  "pink", "brown", "gray", "black", "white",
] as const;

export const sizes = [
  "xs", "s", "m", "l", "xl", "xxl",
  "34", "35", "36", "37", "38", "39", "40",
  "41", "42", "43", "44", "45", "46", "47", "48",
] as const;

export const ProductFormSchema = z.object({
  name: z.string({ message: "Product name is required!" }).min(1, { message: "Product name is required!" }),
  shortDescription: z
    .string({ message: "Short description is required!" })
    .min(1, { message: "Short description is required!" })
    .max(60),
  description: z
    .string({ message: "Description is required!" })
    .min(1, { message: "Description is required!" })
    .max(1000),
  price: z
    .number({ message: "Price must be a number" })
    .min(1, { message: "Price is required!" }),
  categorySlug: z.string({ message: "Category select a category" })
    .min(1, { message: "Category select a category" }),
  sizes: z.array(z.enum(sizes)).min(1, { message: "Select at least one size" }),
  colors: z.array(z.enum(colors)).min(1, { message: "Select at least one color" }),
  images: z.record(z.string(), z.string(), {
    message: "Image for each is required!"
  })
})
  .refine((data) => {
    const missingImages = data.colors.filter(
      (color: string) => !data.images?.[color]
    )
    return missingImages.length === 0
  },{
    message:"Image is required for each selected color!",
    path:["images"]
  })
