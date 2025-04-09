"use client";

import RealTimeEditor from "@/components/RealTimeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingDetails from "@/components/MeetingDetails";
import Summary from "@/components/Summary";
import { useMeetingStore } from "@/store/meetingStore";

export default function Home() {
  const { notes, meetingDetails, setNotes, setMeetingDetails } = useMeetingStore();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Vikimind</h1>

      <Tabs defaultValue="details" className="w-[80%] mx-auto">
        <TabsList>
          <TabsTrigger value="details">Meeting Details</TabsTrigger>
          <TabsTrigger value="realtime">Real-Time Editor</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <MeetingDetails setMeetingDetails={setMeetingDetails} />
        </TabsContent>
        <TabsContent value="realtime">
          <RealTimeEditor />
        </TabsContent>
        <TabsContent value="summary">
          <Summary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
