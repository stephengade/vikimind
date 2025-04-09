
"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMeetingStore } from "@/store/meetingStore";

const RealTimeEditor = () => {
  const { notes, setNotes } = useMeetingStore();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNotes(event.target.value);
    },
    [setNotes]
  );

  const handleExport = () => {
    const blob = new Blob([notes], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting-minutes.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    localStorage.setItem("meetingNotes", notes);
  };

  useEffect(() => {
    const savedNotes = localStorage.getItem("meetingNotes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, [setNotes]);

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Start typing your notes here..."
        value={notes}
        onChange={handleInputChange}
        className="min-h-[300px]"
      />
      <div className="flex space-x-2">
        <Button onClick={handleExport}>Export to TXT</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default RealTimeEditor;
