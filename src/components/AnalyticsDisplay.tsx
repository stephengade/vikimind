
"use client";

import { useMeetingStore } from "@/store/meetingStore";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

const AnalyticsDisplay = () => {
  const { meetingDetails, notes } = useMeetingStore();
  const [meetingsAttended, setMeetingsAttended] = useState(0);
  const [totalNotesTaken, setTotalNotesTaken] = useState(0);
  const [productivityLevel, setProductivityLevel] = useState<"productive" | "moderate" | "stressful">("moderate");
  const [meetingDay, setMeetingDay] = useState<string>('');
  const [meetingEndTime, setMeetingEndTime] = useState<string>('');

  useEffect(() => {
    // Load analytics data from local storage
    const storedMeetings = localStorage.getItem("meetingsAttended");
    const storedNotes = localStorage.getItem("totalNotesTaken");

    if (storedMeetings) {
      setMeetingsAttended(parseInt(storedMeetings, 10));
    }
    if (storedNotes) {
      setTotalNotesTaken(parseInt(storedNotes, 10));
    }
  }, []);

  useEffect(() => {
    // Update meeting day and end time when meetingDetails change
    if (meetingDetails.meetingDay) {
      const dayOfWeek = new Date(meetingDetails.meetingDay).toLocaleDateString('en-US', { weekday: 'long' });
      setMeetingDay(dayOfWeek);
    }

     // Simulate calculating end time (e.g., meeting lasts 1 hour)
    if (meetingDetails.startingTime) {
      const [hours, minutes] = meetingDetails.startingTime.split(":").map(Number);
      const endTimeHours = (hours + 1) % 24; // Adding 1 hour
      const endTimeMinutes = minutes;
      const formattedEndTime = `${String(endTimeHours).padStart(2, '0')}:${String(endTimeMinutes).padStart(2, '0')}`;
      setMeetingEndTime(formattedEndTime);
    }

  }, [meetingDetails]);

  useEffect(() => {
    // Save and update analytics data based on notes
    if (notes.length > 0) {
      setMeetingsAttended((prevMeetings) => {
        const updatedMeetings = prevMeetings + 1;
        localStorage.setItem("meetingsAttended", updatedMeetings.toString());
        return updatedMeetings;
      });

      setTotalNotesTaken((prevNotes) => {
        const updatedNotes = prevNotes + 1;
        localStorage.setItem("totalNotesTaken", updatedNotes.toString());
        return updatedNotes;
      });

      // Determine productivity level based on notes length
      if (notes.length > 500) {
        setProductivityLevel("productive");
      } else if (notes.length > 200) {
        setProductivityLevel("moderate");
      } else {
        setProductivityLevel("stressful");
      }
    }
  }, [notes]);

  const getAnalyticsColor = () => {
    switch (productivityLevel) {
      case "productive":
        return "hsl(var(--analytics-productive))";
      case "moderate":
        return "hsl(var(--analytics-moderate))";
      case "stressful":
        return "hsl(var(--analytics-stressful))";
      default:
        return "hsl(var(--muted-foreground))";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-semibold mb-2">Meetings Attended</h3>
          <p className="text-2xl font-bold">{meetingsAttended}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-semibold mb-2">Notes Taken</h3>
          <p className="text-2xl font-bold">{totalNotesTaken}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-semibold mb-2">Productivity Level</h3>
          <div className="text-2xl font-bold" style={{ color: getAnalyticsColor() }}>
            {productivityLevel.charAt(0).toUpperCase() + productivityLevel.slice(1)}
          </div>
        </CardContent>
      </Card>

       {/* Display Meeting Day and End Time */}
      {meetingDay && meetingEndTime && (
        <Card className="md:col-span-3">
          <CardContent className="flex flex-row justify-around p-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Meeting Day</h3>
              <p className="text-lg">{meetingDay}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Meeting End Time</h3>
              <p className="text-lg">{meetingEndTime}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AnalyticsDisplay;
