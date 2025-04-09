"use client";

import RealTimeEditor from "@/components/RealTimeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingDetails from "@/components/MeetingDetails";
import Summary from "@/components/Summary";
import { useMeetingStore } from "@/store/meetingStore";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

export default function CreateNotePage() {
  const { meetingDetails, setMeetingDetails, notes, setNotes, summaryDetails, setSummaryDetails } = useMeetingStore();
  const [activeTab, setActiveTab] = useState("details");
  const [meetingId, setMeetingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Generate a UUID when the component mounts only if one doesn't exist
    if (!meetingId) {
      const newMeetingId = uuidv4();
      setMeetingId(newMeetingId);
    }
  }, [meetingId]);

  const nextTab = () => {
    switch (activeTab) {
      case "details":
        setActiveTab("realtime");
        break;
      case "realtime":
        setActiveTab("summary");
        break;
    }
  };

  const endMeeting = () => {
    if (!meetingId) {
      console.error("Meeting ID is not available.");
      return;
    }

    // Save the meeting details, notes, and summary to local storage
    if (meetingId) {
      localStorage.setItem(`meeting-${meetingId}`, JSON.stringify({
        meetingDetails,
        notes,
        summaryDetails,
      }));

      // Clear current meeting data
      setMeetingDetails({
        meetingDay: '',
        startingTime: '',
        endingTime: '',
        venue: '',
        attendance: [],
        hostAnchor: '',
      });
      setNotes('');
      setSummaryDetails({
        mainPointDiscussed: '',
        resolution: '',
      });

      router.push("/account");
    }
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">Vikimind - Create Note</h1>

        <Tabs defaultValue={activeTab} className="w-[80%] mx-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="details">Meeting Details</TabsTrigger>
            <TabsTrigger value="realtime">Real-Time Editor</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <MeetingDetails setMeetingDetails={setMeetingDetails} />
            <div className="flex justify-end mt-4">
              <Button onClick={nextTab}>Proceed</Button>
            </div>
          </TabsContent>
          <TabsContent value="realtime">
            <RealTimeEditor />
            <div className="flex justify-end mt-4">
              <Button onClick={nextTab}>Proceed</Button>
            </div>
          </TabsContent>
          <TabsContent value="summary">
            <Summary />
            <div className="flex justify-end mt-4">
              <Button onClick={endMeeting}>End Meeting</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
