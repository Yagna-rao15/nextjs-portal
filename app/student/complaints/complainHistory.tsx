import { fetchUserComplaints } from "@/actions/complain";
import ComplainList from "./complaintList";
import { Clock } from "lucide-react";
import { ComplaintData } from "@/lib/interface";

export default async function ComplaintHistory({ email }: { email: string }) {
  const rawComplaints = await fetchUserComplaints(email);

  const complaints: ComplaintData[] = rawComplaints.map((c) => {
    const date = new Date(c.createdAt);
    return {
      ...c,
      date: isNaN(date.getTime())
        ? "Invalid Date"
        : date.toLocaleDateString("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
    };
  });

  if (complaints.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium">No complaints found</p>
          <p className="text-sm">Submit your first complaint to get started</p>
        </div>
      </div>
    );
  }

  return <ComplainList Complaints={complaints} />;
}
