
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MeetingDetails {
  meetingDay: string;
  startingTime: string;
  endingTime: string;
  venue: string;
  attendance: string[];
  hostAnchor: string;
}

interface SummaryDetails {
  mainPointDiscussed: string;
  resolution: string;
}

interface MeetingState {
  notes: string;
  meetingDetails: MeetingDetails;
  summaryDetails: SummaryDetails;
  setNotes: (notes: string) => void;
  setMeetingDetails: (details: MeetingDetails) => void;
  setSummaryDetails: (summary: SummaryDetails) => void;
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      notes: '',
      meetingDetails: {
        meetingDay: '',
        startingTime: '',
        endingTime: '',
        venue: '',
        attendance: [],
        hostAnchor: '',
      },
      summaryDetails: {
        mainPointDiscussed: '',
        resolution: '',
      },
      setNotes: (notes) => set({ notes }),
      setMeetingDetails: (details) => set({ meetingDetails: details }),
      setSummaryDetails: (summary) => set({ summaryDetails: summary }),
    }),
    {
      name: 'meeting-storage', // unique name
      getStorage: () => localStorage, // Use localStorage
    }
  )
);
