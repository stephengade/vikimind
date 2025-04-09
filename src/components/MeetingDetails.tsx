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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  meetingDay: z.date({
    required_error: "A date of the meeting is required.",
  }),
  startingTime: z.string().regex(new RegExp("^([0-9]{2}):([0-9]{2})$"), {
    message: "Starting Time must be in HH:MM format",
  }),
  venue: z.string().min(2, {
    message: "Venue must be at least 2 characters.",
  }),
  attendance: z.string().min(1, {
    message: "Please enter at least one attendee.",
  }),
  hostAnchor: z.string().min(2, {
    message: "Host/Anchor must be at least 2 characters.",
  }),
});

interface MeetingDetailsProps {
  setMeetingDetails: (details: any) => void;
}

const MeetingDetails: React.FC<MeetingDetailsProps> = ({ setMeetingDetails }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingDay: new Date(),
      startingTime: "10:00",
      venue: "",
      attendance: "",
      hostAnchor: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const attendanceArray = values.attendance.split(",").map((item) => item.trim());

    setMeetingDetails({
      meetingDay: values.meetingDay.toLocaleDateString(),
      startingTime: values.startingTime,
      venue: values.venue,
      attendance: attendanceArray,
      hostAnchor: values.hostAnchor,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="meetingDay"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Meeting Day</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Time</FormLabel>
              <FormControl>
                <Input placeholder="HH:MM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue</FormLabel>
              <FormControl>
                <Input placeholder="Venue of meeting" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attendance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attendance</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="List of attendees, separated by commas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hostAnchor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host/Anchor</FormLabel>
              <FormControl>
                <Input placeholder="Name of host/anchor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default MeetingDetails;
import { format } from "date-fns";
