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
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

import { UserFormSchema } from "@repo/types";
import { toast } from "react-toastify";




const AddUser = () => {
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: [],
      password: "",
    }
  })
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof UserFormSchema>) => {
      const token = await getToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/users`,
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
        throw new Error("Failed to create user!");
      }
    },
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Add User</SheetTitle>
          <SheetDescription asChild>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
              <FieldSet>
                <FieldGroup>
                  <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="firstName"
                          type="text"
                          placeholder="Enter first name"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user first name
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="lastName"
                          type="text"
                          placeholder="Enter last name"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user last name
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="username"
                          type="text"
                          placeholder="Enter username"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user username
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="emailAddress"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="emailAddress">Email Address</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="emailAddress"
                          type="email"
                          placeholder="email1@gmail.com, email2@gmail.com"
                          onChange={(e) => {
                            const emails = e.target.value.split(",").map(email => email.trim()).filter(email => email);
                            field.onChange(emails);
                          }}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user email address
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                          {...field}
                          value={field.value ?? ""}
                          id="password"
                          type="password"
                          placeholder="Enter password"
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Enter user password (min 6 characters)
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
              </FieldSet>

              <Button type="submit" disabled={mutation.isPending} className="disabled:opacity-50 disabled:cursor-not-allowed" >
                {mutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </SheetDescription>
        </SheetHeader>
      </ScrollArea>
    </SheetContent>
  );
};

export default AddUser;