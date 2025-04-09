"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RealTimeEditorProps {
  notes: string;
  setNotes: (notes: string) => void;
}

const RealTimeEditor: React.FC<RealTimeEditorProps> = ({ notes, setNotes }) => {
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

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Start typing your notes here..."
        value={notes}
        onChange={handleInputChange}
        className="min-h-[300px]"
      />
      <Button onClick={handleExport}>Export to TXT</Button>
    </div>
  );
};

export default RealTimeEditor;
