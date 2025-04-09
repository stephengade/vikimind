"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function SettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: localStorage.getItem('userName') || "",
    },
  });

  useEffect(() => {
    // Load username from local storage on component mount
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      form.reset({
        userName: storedUserName,
      });
    }
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Save username to local storage
    localStorage.setItem("userName", values.userName);
    alert("Username saved successfully!");
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
