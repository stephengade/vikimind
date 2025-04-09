"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  speaker: z.string().min(2, {
    message: "Speaker must be at least 2 characters.",
  }),
  timestamp: z.string().regex(new RegExp("^([0-9]{2}):([0-9]{2})$"), {
    message: "Timestamp must be in HH:MM format",
  }),
  mainPoint: z.string().min(10, {
    message: "Main point must be at least 10 characters.",
  }),
  resolution: z.string().min(10, {
    message: "Resolution must be at least 10 characters.",
  }),
});

const ManualInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      speaker: "",
      timestamp: "",
      mainPoint: "",
      resolution: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="speaker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Speaker</FormLabel>
              <FormControl>
                <Input placeholder="Name of speaker" {...field} />
              </FormControl>
              <FormDescription>
                Enter the name of the person speaking.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="timestamp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Timestamp</FormLabel>
              <FormControl>
                <Input placeholder="HH:MM" {...field} />
              </FormControl>
              <FormDescription>
                Enter the time in HH:MM format (e.g., 10:30).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mainPoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Point</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The crux of the speaker's statement"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Summarize the speaker's main point.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resolution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resolution</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The resolution agreed upon."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detail the resolution that was agreed upon.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ManualInput;
