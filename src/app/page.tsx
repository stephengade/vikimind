"use client";

import ManualInput from "@/components/ManualInput";
import RealTimeEditor from "@/components/RealTimeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import MeetingDetails from "@/components/MeetingDetails";
import Summary from "@/components/Summary";

export default function Home() {
  const [notes, setNotes] = useState("");
  const [meetingDetails, setMeetingDetails] = useState({
    meetingDay: "",
    startingTime: "",
    venue: "",
    attendance: [] as string[],
    hostAnchor: "",
  });
  const [summary, setSummary] = useState({
    mainPointDiscussed: "",
    resolution: "",
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Vikimind</h1>

      <Tabs defaultValue="details" className="w-[80%] mx-auto">
        <TabsList>
          <TabsTrigger value="details">Meeting Details</TabsTrigger>
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
          <TabsTrigger value="realtime">Real-Time Editor</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <MeetingDetails setMeetingDetails={setMeetingDetails} />
        </TabsContent>
        <TabsContent value="manual">
          <ManualInput />
        </TabsContent>
        <TabsContent value="realtime">
          <RealTimeEditor notes={notes} setNotes={setNotes} />
        </TabsContent>
        <TabsContent value="summary">
          <Summary notes={notes} meetingDetails={meetingDetails} setSummary={setSummary} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
