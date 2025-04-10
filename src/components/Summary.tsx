
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
import { useMeetingStore } from "@/store/meetingStore";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const formSchema = z.object({
  mainPointDiscussed: z.string().min(10, {
    message: "Main point must be at least 10 characters.",
  }),
  resolution: z.string().min(10, {
    message: "Resolution must be at least 10 characters.",
  }),
});

const Summary = () => {
  const { notes, summaryDetails, setSummaryDetails } = useMeetingStore();
  const { toast } = useToast();
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainPointDiscussed: summaryDetails.mainPointDiscussed,
      resolution: summaryDetails.resolution,
    },
  });

  useEffect(() => {
    // Load summary details from local storage on component mount
    const storedSummaryDetails = localStorage.getItem("summaryDetails");
    if (storedSummaryDetails) {
      const parsedDetails = JSON.parse(storedSummaryDetails);
      form.reset({
        mainPointDiscussed: parsedDetails.mainPointDiscussed || "",
        resolution: parsedDetails.resolution || "",
      });
      setSummaryDetails({
        mainPointDiscussed: parsedDetails.mainPointDiscussed || "",
        resolution: parsedDetails.resolution || "",
      });
    }
  }, [form, setSummaryDetails]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Save summary details to local storage
    localStorage.setItem(
      "summaryDetails",
      JSON.stringify({
        mainPointDiscussed: values.mainPointDiscussed,
        resolution: values.resolution,
      })
    );

    setSummaryDetails({
      mainPointDiscussed: values.mainPointDiscussed,
      resolution: values.resolution,
    });

    if (notes.length > 0) {
      try {
        const result: SummarizeMinutesOutput = await summarizeMinutes({ minutes: notes });
        form.setValue("mainPointDiscussed", result.mainPoints.join("\\n"));
        form.setValue("resolution", result.resolution);
        // Save updated summary details to local storage
        localStorage.setItem(
          "summaryDetails",
          JSON.stringify({
            mainPointDiscussed: result.mainPoints.join("\\n"),
            resolution: result.resolution,
          })
        );
        setSummaryDetails({
          mainPointDiscussed: result.mainPoints.join("\\n"),
          resolution: result.resolution,
        });
        toast({
          title: "Summary generated successfully!",
        });
      } catch (error) {
        console.error("Error summarizing minutes:", error);
        toast({
          title: "Failed to generate summary.",
          description: "Please try again.",
          variant: "destructive",
        });
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
