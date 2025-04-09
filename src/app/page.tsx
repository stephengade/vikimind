
"use client";

import ManualInput from "@/components/ManualInput";
import RealTimeEditor from "@/components/RealTimeEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Home() {
  const [notes, setNotes] = useState("");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">MinuteMind</h1>

      <Tabs defaultValue="manual" className="w-[80%] mx-auto">
        <TabsList>
          <TabsTrigger value="manual">Manual Input</TabsTrigger>
          <TabsTrigger value="realtime">Real-Time Editor</TabsTrigger>
        </TabsList>
        <TabsContent value="manual">
          <ManualInput />
        </TabsContent>
        <TabsContent value="realtime">
          <RealTimeEditor notes={notes} setNotes={setNotes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
