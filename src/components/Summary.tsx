"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { summarizeMinutes, SummarizeMinutesOutput } from "@/ai/flows/summarize-minutes-flow";

const formSchema = z.object({
  mainPointDiscussed: z.string().min(10, {
    message: "Main point must be at least 10 characters.",
  }),
  resolution: z.string().min(10, {
    message: "Resolution must be at least 10 characters.",
  }),
});

interface SummaryProps {
  notes: string;
  meetingDetails: any;
  setSummary: (summary: any) => void;
}

const Summary: React.FC<SummaryProps> = ({ notes, meetingDetails, setSummary }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainPointDiscussed: "",
      resolution: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSummary({
      mainPointDiscussed: values.mainPointDiscussed,
      resolution: values.resolution,
    });

    if (notes.length > 0) {
      try {
        const result: SummarizeMinutesOutput = await summarizeMinutes({ minutes: notes });
        form.setValue("mainPointDiscussed", result.mainPoints.join("\\n"));
        form.setValue("resolution", result.resolution);
        setSummary({
          mainPointDiscussed: result.mainPoints.join("\\n"),
          resolution: result.resolution,
        });
      } catch (error) {
        console.error("Error summarizing minutes:", error);
        // Handle error appropriately (e.g., display an error message to the user)
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="mainPointDiscussed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Point Discussed</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="The crux of the speaker's statement"
                  {...field}
                />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Generate Summary</Button>
      </form>
    </Form>
  );
};

export default Summary;
