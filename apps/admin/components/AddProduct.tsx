"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";
import { CategoryType, colors, ProductFormSchema, sizes } from "@repo/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useAuth } from "@clerk/nextjs";

// const categories = [
//   "T-shirts",
//   "Shoes",
//   "Accessories",
//   "Bags",
//   "Dresses",
//   "Jackets",
//   "Gloves",
// ] as const;

// const colors = [
//   "blue", "green", "red", "yellow", "purple", "orange",
//   "pink", "brown", "gray", "black", "white",
// ] as const;

// const sizes = [
//   "xs", "s", "m", "l", "xl", "xxl",
//   "34", "35", "36", "37", "38", "39", "40",
//   "41", "42", "43", "44", "45", "46", "47", "48",
// ] as const;

// const formSchema = z.object({
//   name: z.string().min(1, { error: "Product name is required!" }),
//   shortDescription: z
//     .string()
//     .min(1, { error: "Short description is required!" })
//     .max(60),
//   description: z
//     .string()
//     .min(1, { error: "Description is required!" })
//     .max(1000),
//   price: z.coerce
//     .number({ error: "Price must be a number" })
//     .min(1, { error: "Price is required!" }),
//   category: z.enum(categories, { error: "Please select a category" }),
//   sizes: z.array(z.enum(sizes)).min(1, { error: "Select at least one size" }),
//   colors: z.array(z.enum(colors)).min(1, { error: "Select at least one color" }),
//   images: z.record(z.enum(colors), z.string()),
// });

// type FormInput = z.input<typeof formSchema>;
// type FormOutput = z.output<typeof formSchema>;

const colorStyles: Record<(typeof colors)[number], string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
  brown: "bg-amber-800",
  gray: "bg-gray-500",
  black: "bg-black",
  white: "bg-white border border-gray-300",
};

const fetchCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/categories`)

  if(!res.ok){
    throw new Error("Failed to fetch categories")
  }

  return await res.json()
}

const AddProduct = () => {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues:{
      name:"",
      shortDescription:"",
      description:"",
      price:0,
      categorySlug:"",
      sizes:[],
      colors:[],
      images: {}
    }
  })

  const { isPending, error, data} = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })

  const { getToken } = useAuth();
  
    const mutation = useMutation({
      mutationFn: async (data: z.infer<typeof ProductFormSchema>) => {
        const token = await getToken();
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL}/products`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to create product!!");
        }
      },
      onSuccess: () => {
        toast.success("Product created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add Product</SheetTitle>
          <SheetDescription asChild>
            <form  className="space-y-6" onSubmit={form.handleSubmit((data)=> mutation.mutate(data))}>
              <FieldSet>
                <FieldGroup>
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="product-name">
                          Product Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="product-name"
                          type="text"
                          placeholder="Enter Product Name"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter the name of the product
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="shortDescription"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="shortDescription">
                          Short Description
                        </FieldLabel>
                        <Input
                          {...field}
                          id="shortDescription"
                          type="text"
                          placeholder="Enter short description"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter the short description of the product
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="description">
                          Description
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Enter description"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter the description of the product
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="price">Price</FieldLabel>
                        <Input
                          {...field}
                          id="price"
                          type="number"
                          placeholder="price"
                          aria-invalid={fieldState.invalid}
                          name={field.name}
                          onChange={(e)=> field.onChange(Number(e.target.value))}
                        />
                        <FieldDescription>
                          Enter the price of the product
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  {data && (<Controller
                    name="categorySlug"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        <Select
                          name={field.name}
                          value={field.value ?? ""}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="category"
                            aria-invalid={fieldState.invalid}
                          >
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {data.map((cat: CategoryType) => (
                              <SelectItem key={cat.id} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FieldDescription>
                          Enter product category
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />)}

                  <Controller
                    name="sizes"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const selectedSizes = field.value ?? [];
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="sizes">Sizes</FieldLabel>
                          <div className="grid grid-cols-3 gap-4 my-2">
                            {sizes.map((size) => {
                              const checked = selectedSizes.includes(size);
                              return (
                                <label
                                  key={size}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Checkbox
                                    id={size}
                                    checked={checked}
                                    aria-invalid={fieldState.invalid}
                                    onCheckedChange={(checkedValue) => {
                                      const nextValue = checkedValue
                                        ? [...selectedSizes, size]
                                        : selectedSizes.filter((item) => item !== size);
                                      field.onChange(nextValue);
                                    }}
                                  />
                                  <span>{size}</span>
                                </label>
                              );
                            })}
                          </div>
                          <FieldDescription>
                            Select the available size for the product
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <Controller
                    name="colors"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const selectedColors = field.value ?? [];
                      return (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="colors">Colors</FieldLabel>
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4 my-2">
                              {colors.map((color) => {
                                const checked = selectedColors.includes(color);
                                return (
                                  <label
                                    key={color}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <Checkbox
                                      id={color}
                                      checked={checked}
                                      aria-invalid={fieldState.invalid}
                                      onCheckedChange={(checkedValue) => {
                                        const nextValue = checkedValue
                                          ? [...selectedColors, color]
                                          : selectedColors.filter((item) => item !== color);
                                        field.onChange(nextValue);
                                      }}
                                    />
                                    <span className="flex items-center gap-2">
                                      <span
                                        className={`h-4 w-4 rounded-full ${colorStyles[color]}`}
                                      />
                                      <span className="capitalize">{color}</span>
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                          <FieldDescription>
                            Select the available colors for this product
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <Controller 
                    name="images"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="images">Images</FieldLabel>
                        <div>
                          {form.watch("colors")?.map((color)=>(
                            <div className="mb-4 flex items-center gap-4" key={color}>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4rounded-full" style={{backgroundColor: color}} />
                                <span className="text-sm font-medium min-w-20">{color}:</span>
                              </div>
                              <Input 
                              type="file"
                              accept="images/*"
                              onChange={async (e) =>{
                                const file = e.target.files?.[0]
                                if(file){
                                  try {
                                    const formData = new FormData()
                                    formData.append("file",file)
                                    formData.append("upload_preset","GiddytechEcom")

                                    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,{
                                      method:"POST",
                                      body:formData
                                    })
                                    const  data = await res.json()
                                    if (data.secure_url){
                                      const currentImages = form.getValues("images") || {}
                                      form.setValue("images", {
                                        ...currentImages,
                                        [color]: data.secure_url
                                      })
                                    }
                                  } catch (error) {
                                    console.log(error)
                                    toast.error("Upload failed")
                                  }
                                }
                              }}
                              />
                              {field.value?.[color] ? (<span className="text-green-600 text-sm">Image selected</span> ): (
                                <span className="text-red-600 text-sm">Image required</span>
                              ) }
                            </div>
                          ))}
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
              <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed" >
              {mutation.isPending ? "Creating..." : "Create Product"}
            </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;