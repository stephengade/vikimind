"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface MeetingData {
  meetingDetails: {
    meetingDay: string;
    startingTime: string;
    endingTime: string;
    venue: string;
    attendance: string[];
    hostAnchor: string;
  };
  notes: string;
  summaryDetails: {
    mainPointDiscussed: string;
    resolution: string;
  };
}

export default function ReadNotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [meetingData, setMeetingData] = useState<MeetingData | null>(null);

  useEffect(() => {
    const storedMeetingData = localStorage.getItem(`meeting-${id}`);
    if (storedMeetingData) {
      setMeetingData(JSON.parse(storedMeetingData));
    }
  }, [id]);

  if (!meetingData) {
    return <div className="container mx-auto py-10">Note not found</div>;
  }

  const downloadPdf = () => {
    alert("Download PDF functionality will be implemented here.");
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Meeting Note - Read Mode</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Meeting Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Meeting Day:</strong> {meetingData.meetingDetails.meetingDay}</p>
          <p><strong>Starting Time:</strong> {meetingData.meetingDetails.startingTime}</p>
          <p><strong>Ending Time:</strong> {meetingData.meetingDetails.endingTime}</p>
          <p><strong>Venue:</strong> {meetingData.meetingDetails.venue}</p>
          <p><strong>Attendance:</strong> {meetingData.meetingDetails.attendance.join(', ')}</p>
          <p><strong>Host/Anchor:</strong> {meetingData.meetingDetails.hostAnchor}</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{meetingData.notes}</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Main Point Discussed:</strong> {meetingData.summaryDetails.mainPointDiscussed}</p>
          <p><strong>Resolution:</strong> {meetingData.summaryDetails.resolution}</p>
        </CardContent>
      </Card>

      <Button onClick={downloadPdf}>Download as PDF</Button>
    </div>
  );
}
