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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const formSchema = z.object({
  amount: z.coerce
    .number({ error: "Amount must be a number" })
    .min(1, { error: "Amount must be at least 1" }),
  userId: z.string().min(1, { error: "User Id is required" }),
  status: z.enum(["pending", "processing", "success", "failed"], {
    error: "Please select a status",
  }),
});

type FormInput = z.input<typeof formSchema>;
type FormOutput = z.output<typeof formSchema>;

const AddOrder = () => {
  const { handleSubmit, control } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      status: "pending",
    },
  });

  const onSubmit = (data: FormOutput) => {
    console.log(data);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Add Order</SheetTitle>
        <SheetDescription asChild>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="amount">Amount</FieldLabel>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount of product"
                        aria-invalid={fieldState.invalid}
                        name={field.name}
                        ref={field.ref}
                        value={
                          typeof field.value === "number" ||
                            typeof field.value === "string"
                            ? field.value
                            : ""
                        }
                        onBlur={field.onBlur}
                        onChange={(e) => {
                          const raw = e.target.value;
                          field.onChange(
                            raw === "" ? undefined : e.target.valueAsNumber
                          );
                        }}
                      />
                      <FieldDescription>
                        Enter the amount of the order
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="userId"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userId">User ID</FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id="userId"
                        type="text"
                        placeholder="Enter user ID"
                        aria-invalid={fieldState.invalid}
                      />
                      <FieldDescription>
                        Enter the User ID
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="status"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="status">Status</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="status" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Enter the status of the order.
                      </FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddOrder;