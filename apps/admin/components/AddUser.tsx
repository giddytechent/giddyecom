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
import { ScrollArea } from "./ui/scroll-area";

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { error: "Full name must be at least 2 characters!" })
    .max(50),
  email: z.email({ error: "Invalid email address!" }),
  phone: z.string().min(10).max(15),
  address: z.string().min(2),
  city: z.string().min(2),
});

type FormValues = z.infer<typeof formSchema>;

const AddUser = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add User</SheetTitle>
          <SheetDescription asChild>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FieldSet>
                <FieldGroup>
                  <Controller
                    name="fullName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="fullname">Full Name</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="fullname"
                          type="text"
                          placeholder="Enter username"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user full name
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="email"
                          type="email"
                          placeholder="Enter email"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Only admin can see your email.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="phone"
                          type="tel"
                          placeholder="Enter phone number"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Only admin can see your phone number (optional).
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="address">Address</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="address"
                          type="text"
                          placeholder="Address"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user address (optional)
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="city">City</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="city"
                          type="text"
                          placeholder="City"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user city (optional)
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
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
      </ScrollArea>
    </SheetContent>
  );
};

export default AddUser;