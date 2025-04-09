
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
  meetingId: string | null;
  userName: string;
  notes: string;
  meetingDetails: MeetingDetails;
  summaryDetails: SummaryDetails;
  setMeetingId: (id: string | null) => void;
  setUserName: (name: string) => void;
  setNotes: (notes: string) => void;
  setMeetingDetails: (details: MeetingDetails) => void;
  setSummaryDetails: (summary: SummaryDetails) => void;
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set) => ({
      meetingId: null,
      userName: '',
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
      setMeetingId: (id) => set({ meetingId: id }),
      setUserName: (name) => set({ userName: name }),
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
