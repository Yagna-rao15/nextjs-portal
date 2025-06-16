export interface ComplaintData {
  id: string;
  email: string;
  category: string;
  name: string;
  mobile: string;
  building: string;
  floor?: string;
  room?: string;
  location: string;
  description: string;
  status: "Pending" | "In Progress" | "Resolved";
  priority: "Low" | "Normal" | "High" | "Urgent";
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  rating?: number;
  resolvedDate?: string;
  expectedResolution?: string;
}
