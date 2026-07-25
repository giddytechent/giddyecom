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

const categories = [
  "T-shirts",
  "Shoes",
  "Accessories",
  "Bags",
  "Dresses",
  "Jackets",
  "Gloves",
] as const;

const colors = [
  "blue", "green", "red", "yellow", "purple", "orange",
  "pink", "brown", "gray", "black", "white",
] as const;

const sizes = [
  "xs", "s", "m", "l", "xl", "xxl",
  "34", "35", "36", "37", "38", "39", "40",
  "41", "42", "43", "44", "45", "46", "47", "48",
] as const;

const formSchema = z.object({
  name: z.string().min(1, { error: "Product name is required!" }),
  shortDescription: z
    .string()
    .min(1, { error: "Short description is required!" })
    .max(60),
  description: z
    .string()
    .min(1, { error: "Description is required!" })
    .max(1000),
  price: z.coerce
    .number({ error: "Price must be a number" })
    .min(1, { error: "Price is required!" }),
  category: z.enum(categories, { error: "Please select a category" }),
  sizes: z.array(z.enum(sizes)).min(1, { error: "Select at least one size" }),
  colors: z.array(z.enum(colors)).min(1, { error: "Select at least one color" }),
  images: z.record(z.enum(colors), z.string()),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

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

const AddProduct = () => {
  const { handleSubmit, control } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      category: undefined, 
      sizes: [],
      colors: [],
      images: {},
    },
  });

  const onSubmit = (data: FormOutput) => {
    console.log(data);
  };

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add Product</SheetTitle>
          <SheetDescription asChild>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FieldSet>
                <FieldGroup>
                  
                  <Controller
                    name="name"
                    control={control}
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
                    control={control}
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
                    control={control}
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
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="price">Price</FieldLabel>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          placeholder="price"
                          aria-invalid={fieldState.invalid}
                          name={field.name}
                          ref={field.ref}
                          value={
                            typeof field.value === "number" || typeof field.value === "string"
                              ? field.value
                              : ""
                          }
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            const raw = e.target.value;
                            field.onChange(raw === "" ? undefined : e.target.valueAsNumber);
                          }}
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

                  <Controller
                    name="category"
                    control={control}
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
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
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
                  />

                  <Controller
                    name="sizes"
                    control={control}
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
                            Select the available sizes
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
                    control={control}
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
                            {selectedColors.length > 0 && (
                              <div className="mt-8 space-y-4">
                                <p className="text-sm font-medium">
                                  Upload images for selected colors
                                </p>
                                {selectedColors.map((color) => (
                                  <div className="flex items-center gap-2" key={color}>
                                    <div
                                      className={`w-2 h-2 rounded-full ${colorStyles[color]}`}
                                    />
                                    <span className="text-sm min-w-15">{color}</span>
                                    <Input type="file" accept="image/*" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          <FieldDescription>
                            Select the available colors
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>
              </FieldSet>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;