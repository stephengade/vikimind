"use client";

import AnalyticsDisplay from "@/components/AnalyticsDisplay";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
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

export default function AccountPage() {
  const [meetings, setMeetings] = useState<{ id: string, data: MeetingData }[]>([]);

  useEffect(() => {
    // Load all meeting notes from local storage
    const meetingsData: { id: string, data: MeetingData }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('meeting-')) {
        const meetingId = key.replace('meeting-', '');
        const meetingData = localStorage.getItem(key);
        if (meetingData) {
          meetingsData.push({ id: meetingId, data: JSON.parse(meetingData) });
        }
      }
    }
    setMeetings(meetingsData);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">Your Account</h1>

      <AnalyticsDisplay />

      <div className="mt-8">
        <Link href="/note/create">
          <Button>Create New Note</Button>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {meetings.map((meeting) => (
            <Link href={`/note/read/${meeting.id}`} key={meeting.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{meeting.data.meetingDetails.venue || 'Untitled Meeting'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Date: {meeting.data.meetingDetails.meetingDay}</p>
                  <p>Host: {meeting.data.meetingDetails.hostAnchor}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          {meetings.length === 0 && <p>No notes created yet.</p>}
        </div>
      </div>
    </div>
  );
}
