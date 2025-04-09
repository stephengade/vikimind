
import { create } from 'zustand';

interface MeetingDetails {
  meetingDay: string;
  startingTime: string;
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

export const useMeetingStore = create<MeetingState>((set) => ({
  notes: '',
  meetingDetails: {
    meetingDay: '',
    startingTime: '',
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
}));
